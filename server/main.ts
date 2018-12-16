import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RenderModule } from './services/next-integration/render.module';
import * as next from 'next';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  config({ path: join(__dirname, '../.env') });

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);
  server.use(require('cookie-parser')());
  server.use(require('body-parser').urlencoded({ extended: true }));
  server.use(require('body-parser').json());

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

  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listenAsync(process.env.PORT, '0.0.0.0');
}

bootstrap();
