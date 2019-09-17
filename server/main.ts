import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextModule } from '@nestpress/next';
import { PassportModule } from '@nestpress/passport';
import { SessionModule } from './logics/session/session.module';
import { AppModule } from './app.module';

async function bootstrap() {
  // enable environment variables
  config();

  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // enable session store in PostgreSQL
  app.get(SessionModule).initialize(app);

  // enable passport session
  // NOTE: we must use this at the end of `app.use()` list
  app.get(PassportModule).initialize(app);

  // prepare Next.js
  app.get(NextModule).prepare().then(() => {
    // start a server
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`[ ARK ] Ready on ${process.env.HOST}:${process.env.PORT}`);
    });
  });
}

bootstrap();
