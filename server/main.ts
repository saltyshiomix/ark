import { join } from 'path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RenderModule } from './next-integration/render.module';
import * as next from 'next';

async function bootstrap() {
  config({ path: join(__dirname, '../.env') });

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);
  server.use(require('cookie-parser')());
  server.use(require('body-parser').urlencoded({ extended: true }));
  server.use(require('body-parser').json());

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listenAsync(process.env.PORT, '0.0.0.0');
}

bootstrap();
