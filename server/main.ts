import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NextModule } from './next/next.module';
import { SessionPostgresModule } from './session/session.postgres.module';
import { SessionPassportModule } from './session/session.passport.module';

async function bootstrap() {
  // enable environment variables
  config();

  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // improve security
  app.use(require('helmet')());

  // improve performance
  app.use(require('compression')());

  // production ready session store
  app.get(SessionPostgresModule).initialize(app);

  // enable passport session
  app.get(SessionPassportModule).initialize(app);

  // prepare Next.js
  app.get(NextModule).prepare().then(() => {
    // start a server
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`[ ARK ] Ready on ${process.env.HOST}:${process.env.PORT}`);
    });
  });
}

bootstrap();
