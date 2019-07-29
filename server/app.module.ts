/** @format */
/* eslint spaced-comment:0 */
/// <reference types="../typings/global" />

// #region Imports NPM
import { IncomingMessage, ServerResponse } from 'http';
import { APP_FILTER } from '@nestjs/core';
import {
  Logger,
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';

import pg from 'pg';
import { PostGraphileModule } from 'postgraphile-nest';
import pgdbi from '@graphile-contrib/pgdbi';
import PgPubSub from '@graphile/pg-pubsub';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import { makePluginHook } from 'postgraphile';

import redisCacheStore from 'cache-manager-redis';

// import { PassportModule } from '@nestjs/passport';
// #endregion
// #region Imports Local
import { rejects } from 'assert';
import { AppHttpExceptionFilter } from './exceptions';
import { ConfigModule } from './config/config.module';
import { NextModule } from './next/next.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NextMiddleware } from './next/next.middleware';
import { ConfigService } from './config/config.service';
import { NextService } from './next/next.service';
import { sessionRedis } from '../lib/session-redis';
import { PassportLoginPlugin } from '../lib/postgraphile/PassportLoginPlugin';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtPayload } from './auth/jwt-payload.interface';
// #endregion

const pluginHook = makePluginHook([
  PgPubSub,
  // TODO: This is UI-admin for PostGraphile
  process.env.NODE_ENV !== 'production' ? pgdbi : undefined,
]);

interface IncomingMessageCtx extends IncomingMessage {
  // TODO: ctx
  ctx?: any;
  session?: any;
}

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

    // #region Passport
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    // #endregion

    // #region PostGraphile
    PostGraphileModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      inject: [ConfigService, AuthService],
      useFactory: async (
        configService: ConfigService,
        authService: AuthService,
      ) => {
        const rootPgPool = new pg.Pool({
          connectionString: configService.get('DATABASE_URL'),
        });

        return {
          pgConfig: configService.get('DATABASE_ADMIN'),
          ownerConnection: configService.get('DATABASE_URL'),

          defaultRole: 'portal_anonym',
          schema: configService.get('DATABASE_SCHEMA')!.split(','),
          playground: process.env.NODE_ENV !== 'production',
          playgroundRoute: '/graphiql',
          subscriptions: true,
          pgWatch: true,
          retryOnInitFail: true,

          pgSettings: async (req: IncomingMessageCtx) => {
            const settings = {
              'role': 'portal_anonym',
              'jwt.claims.user_id':
                req.ctx &&
                req.ctx.state &&
                req.ctx.state.user &&
                `${req.ctx.state.user.id}`,
            };

            return settings;
          },

          // The return value of this is added to `context` - the third argument of
          // GraphQL resolvers. This is useful for our custom plugins.
          additionalGraphQLContextFromRequest: async () =>
            // req: IncomingMessageCtx,
            // res: ServerResponse,
            {
              return {
                // Let plugins call priviliged methods (e.g. login) if they need to
                rootPgPool,

                // Use this to tell Passport.js we're logged in
                login: (user: JwtPayload) =>
                  new Promise((resolve, reject) =>
                    authService
                      .login(user)
                      .then((token: any) => resolve(token))
                      .catch((error) => reject(error)),
                  ),
              };
            },

          websocketMiddlewares: [
            (
              req: IncomingMessage,
              res: ServerResponse,
              next: (err?: Error) => void,
            ): void => {
              // eslint-disable-next-line no-debugger
              debugger;

              console.warn('req', req, 'res', res);
              next();
            },
            sessionRedis(configService),
            // passport.initialize(),
            // passport.session(),
          ],

          appendPlugins: [PgSimplifyInflectorPlugin, PassportLoginPlugin],
          pluginHook,
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
    // #region Logger
    Logger,
    // #endregion

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
