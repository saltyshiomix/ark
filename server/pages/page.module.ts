import { Module } from '@nestjs/common';
import { NextModule } from '@nestpress/next';
import { AuthModule } from '../logics/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { HomeController } from './home/home.controller';
import { LocalLoginStrategy } from './auth/strategies/local-login.strategy';
import { LocalRegisterStrategy } from './auth/strategies/local-register.stratery';

@Module({
  imports: [
    NextModule,
    AuthModule,
  ],
  controllers: [
    AuthController,
    HomeController,
  ],
  providers: [
    LocalLoginStrategy,
    LocalRegisterStrategy,
  ],
})
export class PageModule {}
