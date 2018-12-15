import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RenderModule } from './services/next-integration/render.module';
import * as next from 'next';
import * as passport from 'passport';

async function bootstrap() {
  config({ path: join(__dirname, '../.env') });

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);
  server.use(require('cookie-parser')());
  server.use(require('body-parser').urlencoded({ extended: true }));
  server.use(require('body-parser').json());
  server.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listenAsync(process.env.PORT, '0.0.0.0');
}

bootstrap();
