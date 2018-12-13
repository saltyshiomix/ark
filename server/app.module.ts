import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './database/typeorm.service';
import { EnvModule } from './env/env.module';
import { RenderModule } from './next-integration/render.module';
import { UsersModule } from './entities/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmService,
    }),
    EnvModule,
    RenderModule,
    UsersModule
  ]
})
export class AppModule {}
