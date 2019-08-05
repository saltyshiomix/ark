/** @format */

// #region Imports NPM
import { Logger } from '@nestjs/common';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ClientOptions } from 'ldapjs';
// #endregion

export type Scope = 'base' | 'one' | 'sub';

export interface LdapResponeUser {
  /**
   * Country
   */
  c: string;

  /**
   * Common name
   */
  cn: string;

  /**
   * Country expanded
   */
  co: string;

  /**
   * Comment
   */
  comment: string;

  /**
   * Company
   */
  company: string;

  /**
   * Country code
   */
  countryCode: string;

  /**
   * Department name
   */
  department: string;

  /**
   * Description
   */
  description: string;

  /**
   * Display name
   */
  displayName: string;

  /**
   * Distinguished name
   */
  distinguishedName: string;

  /**
   * DN
   */
  dn: string;

  /**
   * Employee ID
   */
  employeeID: string;

  /**
   * Given name
   */
  givenName: string;

  /**
   * Locality
   */
  l: string;

  // Logon, logoff
  logonCount: string;
  lastLogoff: string;
  lastLogon: string;
  lastLogonTimestamp: string;

  // Lockout time
  lockoutTime: string;

  // E-mail
  mail: string;
  otherMailbox: string[];

  // Member of groups
  memberOf: string[];

  // middle name
  middleName: string;

  // Mobile phone
  mobile: string;

  // Name
  name: string;

  // Object category
  objectCategory: string;

  objectClass: string[];

  // Object GUID
  objectGUID: Buffer;

  // Other telephone
  otherTelephone: string;

  // Postal code
  postalCode: string;

  /**
   * SAM account name
   */
  sAMAccountName: string;

  sAMAccountType: string;

  /**
   * Family name
   */
  sn: string;

  /**
   * Region
   */
  st: string;

  /**
   * Street address
   */
  streetAddress: string;

  /**
   * Telephone number
   */
  telephoneNumber: string;

  /**
   * Thumbnail photo
   */
  thumbnailPhoto: Buffer;

  /**
   * Work title
   */
  title: string;

  userAccountControl: string;

  wWWHomePage: string;

  userPrincipalName: string;

  /**
   * Some additional parameters
   */
  [key: string]: string | string[] | Buffer;
}

interface GroupSearchFilterFunction {
  /**
   * Construct a group search filter from user object
   *
   * @param user The user retrieved and authenticated from LDAP
   */
  (user: any): string;
}

export interface LdapModuleOptions extends ClientOptions {
  /**
   * Logger function
   */
  logger?: Logger;

  /**
   * Admin connection DN, e.g. uid=myapp,ou=users,dc=example,dc=org.
   * If not given at all, admin client is not bound. Giving empty
   * string may result in anonymous bind when allowed.
   *
   * Note: Not passed to ldapjs, it would bind automatically
   */
  bindDN: string;
  /**
   * Password for bindDN
   */
  bindCredentials: string;
  /**
   * The base DN from which to search for users by username.
   * E.g. ou=users,dc=example,dc=org
   */
  searchBase: string;
  /**
   * LDAP search filter with which to find a user by username, e.g.
   * (uid={{username}}). Use the literal {{username}} to have the
   * given username interpolated in for the LDAP search.
   */
  searchFilter: string;
  /**
   * Scope of the search. Default: 'sub'
   */
  searchScope?: Scope;
  /**
   * Array of attributes to fetch from LDAP server. Default: all
   */
  searchAttributes?: string[];

  /**
   * The base DN from which to search for groups. If defined,
   * also groupSearchFilter must be defined for the search to work.
   */
  groupSearchBase?: string;
  /**
   * LDAP search filter for groups. Place literal {{dn}} in the filter
   * to have it replaced by the property defined with `groupDnProperty`
   * of the found user object. Optionally you can also assign a
   * function instead. The found user is passed to the function and it
   * should return a valid search filter for the group search.
   */
  groupSearchFilter?: string | GroupSearchFilterFunction;
  /**
   * Scope of the search. Default: sub
   */
  groupSearchScope?: Scope;
  /**
   * Array of attributes to fetch from LDAP server. Default: all
   */
  groupSearchAttributes?: string[];

  /**
   * Property of the LDAP user object to use when binding to verify
   * the password. E.g. name, email. Default: dn
   */
  bindProperty?: string;
  /**
   * The property of user object to use in '{{dn}}' interpolation of
   * groupSearchFilter. Default: 'dn'
   */
  groupDnProperty?: string;

  /**
   * Set to true to add property '_raw' containing the original buffers
   * to the returned user object. Useful when you need to handle binary
   * attributes
   */
  includeRaw?: boolean;

  /**
   * If true, then up to 100 credentials at a time will be cached for
   * 5 minutes.
   */
  cache?: boolean;
}

export interface LdapOptionsFactory {
  createLdapOptions(): Promise<LdapModuleOptions> | LdapModuleOptions;
}

export interface LdapModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<LdapOptionsFactory>;
  useClass?: Type<LdapOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<LdapModuleOptions> | LdapModuleOptions;
  inject?: any[];
}
