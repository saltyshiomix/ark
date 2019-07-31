/** @format */

// #region Imports NPM
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// #endregion
// #region Imports Local
import { NextModule } from '../next/next.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LdapStrategy } from './strategies/ldap.strategy';
// #endregion

// eslint-disable-next-line no-debugger
debugger;

@Module({
  imports: [
    NextModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'ldapauth', session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.jwtPublicKey,
        privateKey: configService.jwtPrivateKey,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LdapStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
