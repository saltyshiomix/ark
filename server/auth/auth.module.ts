/** @format */

// #region Imports NPM
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// #endregion
// #region Imports Local
import { NextModule } from '../next/next.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtPrivateKey, jwtPublicKey } from './jwt.rsa-options';
// #endregion

@Module({
  imports: [
    NextModule,
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        publicKey: jwtPublicKey,
        privateKey: jwtPrivateKey,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  // controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
