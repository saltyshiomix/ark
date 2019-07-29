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
// #endregion

@Module({
  imports: [
    NextModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'qwer',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  // controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
