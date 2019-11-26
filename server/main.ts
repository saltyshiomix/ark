import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LogicModule } from './logics/logic.module';
import { NextModule } from './logics/next/next.module';

dotenv.config();

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.get(LogicModule).initialize(app);

  app.get(NextModule).prepare().then(() => {
    app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
      console.log(`[ ARK ] Ready on ${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  });
})();
