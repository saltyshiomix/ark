/** @format */

// #region Imports NPM
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
// #endregion
// #region Imports Local
import { LDAP_MODULE_OPTIONS } from './ldap.constants';
import { createLdapProvider } from './ldap.providers';
import { LdapService } from './ldap.service';
import {
  LdapModuleOptions,
  LdapModuleAsyncOptions,
  LdapOptionsFactory,
} from './interfaces/ldap.interface';
// #endregion

@Module({
  providers: [LdapService],
  exports: [LdapService],
})
export class LdapModule {
  static register(options: LdapModuleOptions): DynamicModule {
    return {
      module: LdapModule,
      providers: createLdapProvider(options),
    };
  }

  static registerAsync(options: LdapModuleAsyncOptions): DynamicModule {
    return {
      module: LdapModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: LdapModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass as Type<LdapOptionsFactory>,
        useClass: options.useClass as Type<LdapOptionsFactory>,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: LdapModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: LDAP_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: LDAP_MODULE_OPTIONS,
      useFactory: async (optionsFactory: LdapOptionsFactory) =>
        optionsFactory.createLdapOptions(),
      inject: [
        (options.useExisting as Type<LdapOptionsFactory>) ||
          (options.useClass as Type<LdapOptionsFactory>),
      ],
    };
  }
}
