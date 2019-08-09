/** @format */

// #region Imports NPM
import { Inject, Injectable, Logger } from '@nestjs/common';
import Ldap from 'ldapjs';
import { EventEmitter } from 'events';
import * as bcrypt from 'bcrypt';
// #endregion
// #region Imports Local
import { LdapModuleOptions, LdapResponeUser } from './interfaces/ldap.interface';
import { LDAP_MODULE_OPTIONS } from './ldap.constants';
// #endregion

@Injectable()
export class LdapService extends EventEmitter {
  private readonly logger = new Logger('Ldap');

  private clientOpts: Ldap.ClientOptions;

  private bindDN: string;

  private bindCredentials: string;

  private adminClient: Ldap.Client;

  private adminBound: boolean;

  private userClient: Ldap.Client;

  private getGroups: any;

  // TODO: userCache through redis ?
  private userCache: any;

  private salt: string;

  /**
   * Create an LDAP class.
   *
   * @param {Object} opts - Config options
   * @constructor
   */
  constructor(@Inject(LDAP_MODULE_OPTIONS) private readonly opts: LdapModuleOptions) {
    super();

    // if (opts.cache) {
    // eslint-disable-next-line global-require
    // let Cache = require('./cache');
    // this.userCache = new Cache(100, 300, this.log, 'user');
    // this.salt = bcrypt.genSaltSync();
    // }

    this.clientOpts = {
      url: opts.url,
      tlsOptions: opts.tlsOptions,
      socketPath: opts.socketPath,
      log: opts.logger,
      timeout: opts.timeout,
      connectTimeout: opts.connectTimeout,
      idleTimeout: opts.idleTimeout,
      reconnect: opts.reconnect,
      strictDN: opts.strictDN,
      queueSize: opts.queueSize,
      queueTimeout: opts.queueTimeout,
      queueDisable: opts.queueDisable,
    };

    this.bindDN = opts.bindDN;
    this.bindCredentials = opts.bindCredentials;

    this.adminClient = Ldap.createClient(this.clientOpts);
    this.adminBound = false;
    this.userClient = Ldap.createClient(this.clientOpts);
    this.adminClient.on('error', this.handleError.bind(this));
    this.userClient.on('error', this.handleError.bind(this));

    if (opts.reconnect) {
      this.once('installReconnectListener', () => {
        this.logger.log('install reconnect listener');
        this.adminClient.on('connect', () => this.onConnectAdmin());
      });
    }

    this.adminClient.on('connectTimeout', this.handleError.bind(this));
    this.userClient.on('connectTimeout', this.handleError.bind(this));

    if (opts.groupSearchBase && opts.groupSearchFilter) {
      if (typeof opts.groupSearchFilter === 'string') {
        const { groupSearchFilter } = opts;
        // eslint-disable-next-line no-param-reassign
        opts.groupSearchFilter = (user: any): string => {
          return groupSearchFilter
            .replace(/{{dn}}/g, opts.groupDnProperty && user[opts.groupDnProperty])
            .replace(/{{username}}/g, user.uid);
        };
      }

      this.getGroups = this.findGroups;
    } else {
      // Assign an async identity function so there is no need to branch
      // the authenticate function to have cache set up.
      this.getGroups = async (user: any): Promise<any> => user;
    }
  }

  /**
   * Format a GUID
   *
   * @public
   * @param {string} objectGUID - GUID in AD
   * @returns {string} - string GUID
   */
  public GUIDtoString(objectGUID: string): string {
    const buf = Buffer.from(objectGUID, 'binary').toString('hex');
    const rep = buf.replace(
      /^(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)(..)$/,
      '$4$3$2$1-$6$5-$8$7-$10$9-$15$14$13$12$11',
    );
    return rep.toUpperCase();
  }

  /**
   * Mark admin client unbound so reconnect works as expected and re-emit the error
   *
   * @private
   * @param {Error} err - The error to be logged and emitted
   * @returns {void}
   */
  private handleError(err: Ldap.Error): void {
    this.logger.error(`emitted error: ${err}`);
    this.adminBound = false;
  }

  /**
   * Bind adminClient to the admin user on connect
   *
   * @private
   * @returns {boolean | Error}
   */
  private async onConnectAdmin(): Promise<boolean | Error> {
    // Anonymous binding
    if (typeof this.bindDN === 'undefined' || this.bindDN === null) {
      this.adminBound = false;
      throw new Error('bindDN is undefined');
    }

    this.logger.log(`bind: ${this.bindDN}`);

    return new Promise((resolve, reject) =>
      this.adminClient.bind(this.bindDN, this.bindCredentials, (error: Ldap.Error) => {
        if (error) {
          this.logger.error(`bind error: ${error}`);
          this.adminBound = false;
          return reject(error);
        }

        this.logger.log('ldap: bind ok');
        this.adminBound = true;
        if (this.opts.reconnect) {
          this.emit('installReconnectListener');
        }
        return resolve(true);
      }),
    );
  }

  /**
   * Ensure that `this.adminClient` is bound.
   *
   * @private
   * @returns {boolean | Error}
   */
  // eslint-disable-next-line no-confusing-arrow
  private adminBind = async (): Promise<boolean | Error> => (this.adminBound ? true : this.onConnectAdmin());

  /**
   * Conduct a search using the admin client. Used for fetching both
   * user and group information.
   *
   * @private
   * @param {string} searchBase - LDAP search base
   * @param {Object} options - LDAP search options
   * @param {string} options.filter - LDAP search filter
   * @param {string} options.scope - LDAP search scope
   * @param {(string[]|undefined)} options.attributes - Attributes to fetch
   * @returns {undefined}
   */
  private async search(searchBase: string, options: Ldap.SearchOptions): Promise<any> {
    return this.adminBind()
      .then(() => {
        return new Promise((resolve, reject) =>
          this.adminClient.search(
            searchBase,
            options,
            (searchErr: Ldap.Error | null, searchResult: Ldap.SearchCallbackResponse) => {
              if (searchErr) {
                return reject(searchErr);
              }

              const items: Ldap.SearchEntryObject[] = [];
              searchResult.on('searchEntry', (entry: Ldap.SearchEntry) => {
                const { object } = entry;
                if (object.hasOwnProperty('objectGUID')) {
                  object.objectGUID = this.GUIDtoString(object.objectGUID as string);
                }
                items.push(object);
                if (this.opts.includeRaw === true) {
                  items[items.length - 1].raw = (entry.raw as unknown) as string;
                }
              });

              searchResult.on('error', (error: Ldap.Error) => reject(error));

              searchResult.on('end', (result: Ldap.LDAPResult) => {
                if (result.status !== 0) {
                  return reject(new Error(`non-zero status from LDAP search: ${result.status}`));
                }

                return resolve(items);
              });

              return true;
            },
          ),
        );
      })
      .catch((error) => {
        this.logger.error(`search error: ${error.code} ${error.name} ${error.message}`);
        throw error;
      });
  }

  /**
   * Sanitize LDAP special characters from input
   *
   * {@link https://tools.ietf.org/search/rfc4515#section-3}
   *
   * @private
   * @param {string} input - String to sanitize
   * @returns {string} Sanitized string
   */
  private sanitizeInput(input: string): string {
    return input
      .replace(/\*/g, '\\2a')
      .replace(/\(/g, '\\28')
      .replace(/\)/g, '\\29')
      .replace(/\\/g, '\\5c')
      .replace(/\0/g, '\\00')
      .replace(/\//g, '\\2f');
  }

  /**
   * Find the user record for the given username.
   *
   * @private
   * @param {string} username - Username to search for
   * @returns {undefined} - If user is not found but no error happened, result is undefined.
   */
  private async findUser(username: string): Promise<any> {
    if (!username) {
      throw new Error('empty username');
    }

    const searchFilter = this.opts.searchFilter.replace(/{{username}}/g, this.sanitizeInput(username));
    const opts = {
      filter: searchFilter,
      scope: this.opts.searchScope,
      attributes: ['*'],
    };
    if (this.opts.searchAttributes) {
      opts.attributes = this.opts.searchAttributes;
    }

    return this.search(this.opts.searchBase, opts)
      .then(
        (result: any) =>
          new Promise((resolve, reject) => {
            switch (result.length) {
              case 0:
                return resolve(false);
              case 1:
                return resolve(result[0]);
              default:
                return reject(new Error(`unexpected number of matches (${result.length}) for "${username}" username`));
            }
          }),
      )
      .catch((error) => {
        this.logger.error(`findUser: ${error.code} ${error.name} ${error.message}`);
        throw new Error(error);
      });
  }

  /**
   * Find groups for given user
   *
   * @private
   * @param {Object} user - The LDAP user object
   * @returns {void} - Result handling callback
   */
  private async findGroups(user: any): Promise<any> {
    if (!user) {
      throw new Error('no user');
    }

    const searchFilter =
      typeof this.opts.groupSearchFilter === 'function' ? this.opts.groupSearchFilter(user) : undefined;

    const opts = {
      filter: searchFilter,
      scope: this.opts.groupSearchScope,
      attributes: ['*'],
    };
    if (this.opts.groupSearchAttributes) {
      opts.attributes = this.opts.groupSearchAttributes;
    }

    return this.search(this.opts.groupSearchBase || this.opts.searchBase, opts)
      .then((result: Ldap.SearchCallBack) => {
        user.groups = result;
        return user;
      })
      .catch((error) => {
        this.logger.error(`group search error: ${error.code} ${error.name} ${error.message}`);
        throw error;
      });
  }

  /**
   * Authenticate given credentials against LDAP server
   *
   * @param {string} username - The username to authenticate
   * @param {string} password - The password to verify
   * @returns {object} - User in LDAP
   */
  public async authenticate(username: string, password: string): Promise<any | LdapResponeUser> {
    if (typeof password === 'undefined' || password === null || password === '') {
      this.logger.error('no password given');
      throw new Error('no password given');
    }

    if (this.opts.cache && this.userCache) {
      // Check cache. 'cached' is `{password: <hashed-password>, user: <user>}`.
      const cached = this.userCache.get(username);
      if (cached && bcrypt.compareSync(password, cached.password)) {
        return cached.user as LdapResponeUser;
      }
    }

    // 1. Find the user DN in question.
    return this.findUser(username)
      .then((user: any) => {
        return new Promise((resolve, reject) => {
          if (!user) {
            return reject(new Error(`no such user: "${username}"`));
          }

          // 2. Attempt to bind as that user to check password.
          return this.userClient.bind(
            user[this.opts.bindProperty || 'dn'],
            password,
            async (bindErr: Ldap.Error): Promise<any> => {
              if (bindErr) {
                this.logger.error(`bind error: ${bindErr}`);
                return reject(bindErr);
              }

              // 3. If requested, fetch user groups
              try {
                const userWithGroups = await this.getGroups(user);

                if (this.opts.cache) {
                  return bcrypt.hash(password, this.salt, (err, hash) => {
                    if (err) {
                      this.logger.error(`bcrypt error, not caching ${err}`);
                    } else {
                      this.userCache.set(username, {
                        password: hash,
                        user: userWithGroups,
                      });
                    }
                    return resolve(userWithGroups as LdapResponeUser);
                  });
                }

                return resolve(userWithGroups as LdapResponeUser);
              } catch (error) {
                this.logger.error(`authenticate: ${error}`);
                throw error;
              }
            },
          );
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Unbind connections
   *
   * @param {voidCallback} callback - Callback
   * @returns {boolean}
   */
  public async close(): Promise<boolean> {
    // It seems to be OK just to call unbind regardless of if the
    // client has been bound (e.g. how ldapjs pool destroy does)
    return new Promise((resolve) => {
      this.adminClient.unbind(() => {
        this.logger.log('adminClient: close');

        this.userClient.unbind(() => {
          this.logger.log('userClient: close');

          resolve(true);
        });
      });
    });
  }
}
