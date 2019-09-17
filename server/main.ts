import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextModule } from '@nestpress/next';
import { AppModule } from './app.module';
import { LogicModule } from './logics/logic.module';

async function bootstrap() {
  // enable environment variables
  config();

  // create nest server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // initialize logics
  app.get(LogicModule).initialize(app);

  // prepare Next.js
  app.get(NextModule).prepare().then(() => {
    // start a server
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`[ ARK ] Ready on ${process.env.HOST}:${process.env.PORT}`);
    });
  });
}

bootstrap();
