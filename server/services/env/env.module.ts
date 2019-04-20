import { join } from 'path';
import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(join(process.cwd(), '.env'))
    }
  ],
  exports: [EnvService]
})
export class EnvModule {}
