/** @format */

// #region Imports NPM
// import { IncomingMessage } from 'http';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import responseTime from 'response-time';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
  // eslint-disable-next-line prettier/prettier
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, nestjsOptions);
  app.useLogger(app.get(AppLogger));
  // #endregion

  // #region X-Response-Time
  app.use(responseTime());
  // #endregion

  // #region improve security
  app.use(helmet());
  // #endregion

  // #region improve performance
  app.use(compression());
  // #endregion

  // #region enable cookie
  app.use(cookieParser());
  // #endregion

  // #region enable json response
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // #endregion

  // #region production ready session store
  app.use(sessionRedis(configService));
  // #endregion

  // #region Swagger module - for development
  // if (process.env.NODE_ENV !== 'production') {
  //   const options = new DocumentBuilder()
  //     .setTitle('Authentication')
  //     .setDescription('The authentication API')
  //     .setVersion('1.0')
  //     .addTag('auth')
  //     .addBearerAuth()
  //     .build();
  //   const document = SwaggerModule.createDocument(app, options);
  //   SwaggerModule.setup('api/auth', app, document);
  // }
  // #endregion

  // #region Static files
  app.useStaticAssets(join(__dirname, '..', 'static'));
  // #endregion

  // #region start server
  await app.listen(configService.get('PORT'), configService.get('HOST'));
  Logger.log(`Server running on ${configService.get('HOST')}:${configService.get('PORT')}`, 'Bootstrap');
  // #endregion
}

const configService = new ConfigService(join(process.cwd(), '.env'));
bootstrap(configService);
