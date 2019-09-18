import { Module } from '@nestjs/common';
import { NextModule } from '@nestpress/next';
import { AuthModule } from '../logics/auth/auth.module';
import { AuthController } from './auth.controller';
import { HomeController } from './home.controller';

@Module({
  imports: [
    NextModule,
    AuthModule,
  ],
  controllers: [
    AuthController,
    HomeController,
  ],
})
export class RouteModule {}
