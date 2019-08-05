/** @format */

// #region Imports Local
import { LdapModuleOptions } from './interfaces/ldap.interface';
import { LDAP_MODULE_OPTIONS } from './ldap.constants';
// #endregion

export function createLdapProvider(options: LdapModuleOptions): any[] {
  return [{ provide: LDAP_MODULE_OPTIONS, useValue: options || {} }];
}
