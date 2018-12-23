import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RenderModule } from './services/next-integration/render.module';
import * as next from 'next';
import * as passport from 'passport';
import * as session from 'express-session';
import * as helmet from 'helmet';

async function bootstrap() {
  // enable environment variables
  config({ path: join(__dirname, '../.env') });

  // prepare Next.js
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  await app.prepare();

  // create nest server
  const server = await NestFactory.create(AppModule, { enableCors: true });

  // improve security
  server.use(helmet());

  // enable cookie
  server.use(require('cookie-parser')());

  // enable json response
  server.use(require('body-parser').urlencoded({ extended: true }));
  server.use(require('body-parser').json());

  // production ready session store
  const pgSession = require('connect-pg-simple')(session);
  server.use(session({
    secret: process.env.SESSION_SECRET,
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
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // integration between nest and Next.js
  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  // start server
  await server.listenAsync(process.env.PORT, '0.0.0.0');
}

bootstrap();
