/** @format */

import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import connectPgSimple from 'connect-pg-simple';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // enable environment variables
  config({ path: join(process.cwd(), '.env') });

  // create nest server
  const server: INestApplication = await NestFactory.create(AppModule);

  // CORS
  server.enableCors();

  // improve security
  server.use(helmet());

  // improve performance
  server.use(compression());

  // enable cookie
  server.use(cookieParser());

  // enable json response
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  // production ready session store
  const pgSession = connectPgSimple(session);
  server.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      store: new pgSession({
        conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        // crear_interval: 60 * 60, // sec
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

  // enable passport session
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // start server
  await server.listen(process.env.PORT as string, '0.0.0.0');
}

bootstrap();
