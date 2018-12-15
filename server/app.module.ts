import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './services/database/typeorm.service';
import { EnvModule } from './services/env/env.module';
import { RenderModule } from './services/next-integration/render.module';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './entities/users/users.module';

@Module({
  imports: [
    // services
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmService,
    }),
    EnvModule,
    RenderModule,
    AuthModule,

    // entities
    UsersModule
  ]
})
export class AppModule {}
