/** @format */

// #region Imports NPM
import ldapStrategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// #endregion
// #region Imports Local
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../auth.service';
// #endregion

@Injectable()
export class LdapStrategy extends PassportStrategy(ldapStrategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super(
      {
        server: {
          url: configService.get('LDAP_URL'),
          bindDN: configService.get('LDAP_BIND_DN'),
          bindCredentials: configService.get('LDAP_BIND_PW'),
          searchBase: configService.get('LDAP_SEARCH_BASE'),
          searchFilter: configService.get('LDAP_SEARCH_FILTER'),
        },
        usernameField: 'sAMAccountName',
      },
      (user: any, done: any) => {
        // eslint-disable-next-line no-debugger
        debugger;
        return done(null, user);
      },
    );

    // eslint-disable-next-line no-debugger
    debugger;
  }

  async validate(username: string, password: string): Promise<any> {
    // eslint-disable-next-line no-debugger
    debugger;

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
