import { Module } from '@nestjs/common';
import { NextModule } from '../next/next.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';
import { LocalLoginStrategy } from './strategies/local-login.strategy';

@Module({
  imports: [
    NextModule,
    UsersModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalRegisterStrategy,
    LocalLoginStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
