import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './services/database/typeorm.service';
import { EnvModule } from './services/env/env.module';
import { RenderModule } from './services/next-integration/render.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    // services
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmService,
    }),
    EnvModule,
    RenderModule,

    // api routes
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
