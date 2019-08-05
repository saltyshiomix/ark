/** @format */

// #region Imports NPM
import { Module, forwardRef } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// #endregion
// #region Imports Local
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '../config/config.module';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';
import { LdapModule } from '../ldap/ldap.module';
import { Scope } from '../ldap/interfaces/ldap.interface';
import { ConfigService } from '../config/config.service';
import { LoggerModule } from '../logger/logger.module';
// #endregion

@Module({
  imports: [
    // #region Config module
    ConfigModule,
    LoggerModule,
    // #endregion

    // #region TypeORM
    TypeOrmModule.forFeature([UserEntity]),
    // #endregion

    // #region LDAP
    LdapModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          url: configService.get('LDAP_URL'),
          bindDN: configService.get('LDAP_BIND_DN'),
          bindCredentials: configService.get('LDAP_BIND_PW'),
          searchBase: configService.get('LDAP_SEARCH_BASE'),
          searchFilter: configService.get('LDAP_SEARCH_FILTER'),
          searchScope: 'sub' as Scope,
          searchAttributes: ['*'],
          reconnect: true,
        };
      },
    }),
    // #endregion

    // #region Authentication
    forwardRef(() => AuthModule),
    // #endregion
  ],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
