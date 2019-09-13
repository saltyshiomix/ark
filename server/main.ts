import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextModule } from '@nestpress/next';
import { PassportModule } from '@nestpress/passport';
import { AppModule } from './app.module';
import { SessionPostgresModule } from './session/session.postgres.module';

async function bootstrap() {
  // enable environment variables
  config();

  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // enable passport session
  app.get(PassportModule).initialize(app);

  // enable session store in PostgreSQL
  app.get(SessionPostgresModule).initialize(app);

  // improve security
  app.use(require('helmet')());

  // improve performance
  app.use(require('compression')());

  // prepare Next.js
  app.get(NextModule).prepare().then(() => {
    // start a server
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`[ ARK ] Ready on ${process.env.HOST}:${process.env.PORT}`);
    });
  });
}

bootstrap();
