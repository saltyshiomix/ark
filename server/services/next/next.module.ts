import { Module } from '@nestjs/common';
import { NextService } from './next.service';

@Module({
  providers: [
    NextService,
  ],
  exports: [
    NextService,
  ],
})
export class NextModule {}
