/** @format */

// #region Imports NPM
import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import responseTime from 'response-time';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import redisStore from 'connect-redis';
import passport from 'passport';
// #endregion
// #region Imports Local
// import { AppLogger } from './logger';
import { AppModule } from './app.module';
// #endregion

async function bootstrap(): Promise<void> {
  // #region enable environment variables
  config({ path: join(process.cwd(), '.env') });
  // #endregion

  // #region create NestJS server
  const nestjsOptions: NestApplicationOptions = {
    cors: {
      credentials: true,
    },
    logger: new Logger('Portal', true),
    // httpsOptions: {},
  };
  const server: INestApplication = await NestFactory.create(
    AppModule,
    nestjsOptions,
  );
  // #endregion

  // #region X-Response-Time
  server.use(responseTime());
  // #endregion

  // #region improve security
  server.use(helmet());
  // #endregion

  // #region improve performance
  server.use(compression());
  // #endregion

  // #region enable cookie
  server.use(cookieParser());
  // #endregion

  // #region enable json response
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  // #endregion

  // #region production ready session store
  server.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      store: new (redisStore(session))({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT
          ? parseInt(process.env.REDIS_PORT, 10)
          : 6379,
        db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : 0,
      }),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: false,
        maxAge: 60 * 60 * 1000, // msec
      },
    }),
  );
  // #endregion

  // #region enable passport session
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
  // #endregion

  // #region start server
  await server.listen(process.env.PORT as string, '0.0.0.0');
  // #endregion
}

bootstrap();
