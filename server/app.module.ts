/** @format */
/* eslint spaced-comment:0 */
/// <reference types="../typings/global" />

// #region Imports NPM
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import redisStore from 'cache-manager-redis';
import { PostGraphileModule } from 'postgraphile-nest';
import { IncomingMessage } from 'http';
// #endregion
// #region Imports Local
import { AppHttpExceptionFilter } from './exceptions';
import { ConfigModule } from './config/config.module';
import { NextModule } from './next/next.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NextMiddleware } from './next/next.middleware';
import { ConfigService } from './config/config.service';
import { NextService } from './next/next.service';
// #endregion

@Module({
  imports: [
    ConfigModule,

    // #region Cache Manager - Redis
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        ttl: 1, // seconds
        max: 60, // maximum number of items in cache
        host: configService.get('REDIS_HOST'),
        port: parseInt(configService.get('REDIS_PORT'), 10),
        db: configService.get('REDIS_DB')
          ? parseInt(configService.get('REDIS_DB'), 10)
          : undefined,
        password: configService.get('REDIS_PASSWORD')
          ? configService.get('REDIS_PASSWORD')
          : undefined,
        keyPrefix: configService.get('REDIS_PREFIX')
          ? configService.get('REDIS_PREFIX')
          : undefined,
      }),
    }),
    // #endregion

    // #region PostGraphile
    PostGraphileModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pgConfig: configService.get('DATABASE_URL'),
          schema: configService.get('DATABASE_SCHEMA')!.split(','),
          pgSettings: async (_req: IncomingMessage) => ({
            // role: 'visitor',
            // 'jwt.claims.user.id': `${req.user_id}`,
          }),
          playground: !(process.env.NODE_ENV === 'production'),
          playgroundRoute: '/graphiql',
        };
      },
    }),
    // #endregion

    // #region Next
    NextModule,
    // #endregion

    // #region Authentication
    // UsersModule,
    // AuthModule,
    // #endregion

    // #region Home page
    HomeModule,
    // #endregion
  ],

  providers: [
    // #region Errors: ExceptionFilter
    {
      provide: APP_FILTER,
      inject: [NextService],
      useFactory: (nextService: NextService) => {
        return new AppHttpExceptionFilter(nextService);
      },
    },
    // #endregion
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(NextMiddleware)
      .forRoutes({ path: '_next*', method: RequestMethod.GET });
  }
}
