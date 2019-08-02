/** @format */

// #region Imports NPM
import session from 'express-session';
import redisSessionStore from 'connect-redis';
import { ConfigService } from '../config/config.service';
// #endregion

export const sessionRedis = (configService: ConfigService): any =>
  session({
    secret: configService.get('SESSION_SECRET'),
    store: new (redisSessionStore(session))({
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get('REDIS_PORT'), 10),
      db: parseInt(configService.get('REDIS_DB'), 10),
    }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      maxAge: 60 * 60 * 1000, // msec
    },
  });
