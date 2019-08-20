import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  // enable environment variables
  config();

  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors();

  // improve security
  app.use(require('helmet')());

  // improve performance
  app.use(require('compression')());

  // enable cookie
  app.use(require('cookie-parser')());

  // enable json response
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('body-parser').json());

  // production ready session store
  const pgSession = require('connect-pg-simple')(session);
  app.use(session({
    secret: process.env.SESSION_SECRET as string,
    store: new pgSession({
      conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
      crear_interval: 60 * 60 // sec
    }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      maxAge: 60 * 60 * 1000 // msec
    }
  }));

  // enable passport session
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // start server
  app.listen(process.env.PORT as string, '0.0.0.0');
}

bootstrap();
