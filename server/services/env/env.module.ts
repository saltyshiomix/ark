import { join } from 'path';
import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(join(__dirname, process.env.NODE_ENV === 'production' ? '../../../../.env' : '../../../.env'))
    }
  ],
  exports: [EnvService]
})
export class EnvModule {}
