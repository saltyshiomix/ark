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
import redisStore from 'cache-manager-redis';
import { PostGraphileModule } from 'postgraphile-nest';
// #endregion
// #region Imports Local
import { IncomingMessage } from 'http';
import { ConfigModule } from './config/config.module';
import { NextModule } from './next/next.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NextMiddleware } from './next/next.middleware';
import { ConfigService } from './config/config.service';
// #endregion

@Module({
  imports: [
    ConfigModule,

    // #region Cache Manager - Redis
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
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
      useFactory: (configService: ConfigService) => {
        return {
          pgConfig: configService.get('DATABASE_URL'),
          schema: configService.get('DATABASE_SCHEMA')!.split(','),
          pgSettings: async (_req: IncomingMessage) => ({
            // role: 'visitor',
            // 'jwt.claims.user.id': `${req.user_id}`,
          }),
          playground: !!(process.env.NODE_ENV !== 'production'),
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
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(NextMiddleware)
      .forRoutes({ path: '_next*', method: RequestMethod.GET });
  }
}
