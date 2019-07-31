/** @format */

// #region Imports NPM
// import { IncomingMessage } from 'http';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import responseTime from 'response-time';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
// #endregion
// #region Imports Local
import { sessionRedis } from '../lib/session-redis';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
// #endregion

async function bootstrap(configService: ConfigService): Promise<void> {
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
  server.use(sessionRedis(configService));
  // #endregion

  // #region enable passport session
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
  // #endregion

  // #region start server
  await server.listen(configService.get('PORT'), '0.0.0.0');
  Logger.log(
    `Server running on ${configService.get('HTTP')}://${configService.get(
      'HOST',
    )}:${configService.get('PORT')}`,
    'Bootstrap',
  );
  // #endregion
}

const configService = new ConfigService(join(process.cwd(), '.env'));
bootstrap(configService);
