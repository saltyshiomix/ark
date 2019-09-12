import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './database/typeorm.service';
import { SessionPostgresModule } from './session/session.postgres.module';
import { SessionPassportModule } from './session/session.passport.module';
import { EnvModule } from './env/env.module';
import { NextModule } from './next/next.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NextAssetsMiddleware } from './next/next.assets.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmService,
    }),
    SessionPostgresModule,
    SessionPassportModule,
    EnvModule,
    NextModule,
    UserModule,
    AuthModule,
    HomeModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextAssetsMiddleware).forRoutes({ path: '_next*', method: RequestMethod.GET });
  }
}
