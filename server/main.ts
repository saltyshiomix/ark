/** @format */

// #region Imports NPM
// import { IncomingMessage } from 'http';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import responseTime from 'response-time';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import passport from 'passport';
// #endregion
// #region Imports Local
import { sessionRedis } from './shared/session-redis';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AppLogger } from './logger/logger.service';
// #endregion

// #region NestJS options
const nestjsOptions: NestApplicationOptions = {
  cors: {
    credentials: true,
  },
  logger: new Logger('Portal', true),
  // httpsOptions: {},
};
// #endregion

async function bootstrap(configService: ConfigService): Promise<void> {
  // #region create NestJS server
  const server: INestApplication = await NestFactory.create(
    AppModule,
    nestjsOptions,
  );
  server.useLogger(server.get(AppLogger));
  // #endregion

  // #region X-Response-Time
  server.use(responseTime());
  // #endregion

  // #region improve security
  server.use(helmet());
  // #endregion

  // #region improve performance
  server.use(compression());
  // #endregion

  // #region enable cookie
  server.use(cookieParser());
  // #endregion

  // #region enable json response
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  // #endregion

  // #region production ready session store
  server.use(sessionRedis(configService));
  // #endregion

  // #region Swagger module - for development
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Authentication')
      .setDescription('The authentication API')
      .setVersion('1.0')
      .addTag('auth')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(server, options);
    SwaggerModule.setup('api/auth', server, document);
  }
  // #endregion

  // #region start server
  await server.listen(configService.get('PORT'), '0.0.0.0');
  Logger.log(
    `Server running on ${configService.get('HOST')}:${configService.get(
      'PORT',
    )}`,
    'Bootstrap',
  );
  // #endregion
}

const configService = new ConfigService(join(process.cwd(), '.env'));
bootstrap(configService);
