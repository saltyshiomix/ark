/** @format */
/* eslint spaced-comment:0 */
/// <reference types="../typings/global" />

// #region Imports NPM
import { Module, NestModule, MiddlewareConsumer, RequestMethod, CacheModule } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import redisCacheStore from 'cache-manager-redis';
// #endregion
// #region Imports Local
import { ConfigModule } from './config/config.module';
import { NextModule } from './next/next.module';
import { HomeModule } from './home/home.module';
import { NextMiddleware } from './next/next.middleware';
import { NextAssetsMiddleware } from './next/next.assets.middleware';
import { ConfigService } from './config/config.service';
import { ApiModule } from './api.module';
import { DateScalar } from './shared/date.scalar';
import { AuthModule } from './auth/auth.module';
// #endregion

@Module({
  imports: [
    ConfigModule,

    // #region Cache Manager - Redis
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisCacheStore,
        ttl: 1, // seconds
        max: 60, // maximum number of items in cache
        host: configService.get('REDIS_HOST'),
        port: parseInt(configService.get('REDIS_PORT'), 10),
        db: configService.get('REDIS_DB') ? parseInt(configService.get('REDIS_DB'), 10) : undefined,
        password: configService.get('REDIS_PASSWORD') ? configService.get('REDIS_PASSWORD') : undefined,
        keyPrefix: configService.get('REDIS_PREFIX') ? configService.get('REDIS_PREFIX') : undefined,
      }),
    }),
    // #endregion

    // #region TypeORM
    TypeOrmModule.forRoot({}),
    // #endregion

    // #region GraphQL
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req, user: req.user }),
    }),
    // #endregion

    // #region Next
    NextModule,
    // #endregion

    // #region Authentication
    AuthModule,
    // #endregion

    // #region API module
    ApiModule,
    // #endregion

    // #region Home page
    HomeModule,
    // #endregion
  ],

  providers: [
    // #region GraphQL
    DateScalar,
    // #endregion
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NextAssetsMiddleware).forRoutes({ path: '_next*', method: RequestMethod.GET });
    consumer.apply(NextMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
