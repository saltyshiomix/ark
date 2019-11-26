import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextModule } from '@nestpress/next';
import { AppModule } from './app.module';
import { LogicModule } from './logics/logic.module';

// enable environment variables
dotenv.config();

(async () => {
  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // initialize logics
  app.get(LogicModule).initialize(app);

  // prepare Next.js
  app.get(NextModule).prepare().then(() => {
    // start a server
    app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
      console.log(`[ ARK ] Ready on ${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  });
})();
