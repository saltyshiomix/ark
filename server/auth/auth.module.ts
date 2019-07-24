/** @format */

// #region Imports NPM
import { Module } from '@nestjs/common';
// #endregion
// #region Imports Local
import { NextModule } from '../next/next.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
// #endregion

@Module({
  imports: [NextModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalRegisterStrategy, LocalLoginStrategy],
  exports: [AuthService],
})
export class AuthModule {}
