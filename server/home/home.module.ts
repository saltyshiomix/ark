import { Module } from '@nestjs/common';
import { NextModule } from '../next/next.module';
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
