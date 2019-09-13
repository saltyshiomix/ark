import { Module } from '@nestjs/common';
import { NextModule } from '@nestpress/next';
import { HomeController } from './home.controller';

@Module({
  imports: [
    NextModule,
  ],
  controllers: [
    HomeController,
  ],
})
export class HomeModule {}
