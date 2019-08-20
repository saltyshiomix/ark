import { Module } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    EnvModule,
  ],
})
export class SessionPostgresModule {
  constructor(
    private readonly env: EnvService,
  ) {}

  public initialize(app: NestExpressApplication) {
    const SESSION_SECRET: string = this.env.get('SESSION_SECRET');
    const DB_USERNAME: string = this.env.get('DB_USERNAME');
    const DB_PASSWORD: string = this.env.get('DB_PASSWORD');
    const DB_HOST: string = this.env.get('DB_HOST');
    const DB_PORT: string = this.env.get('DB_PORT');
    const DB_DATABASE: string = this.env.get('DB_DATABASE');

    const pgSession = require('connect-pg-simple')(session);
    app.use(session({
      secret: SESSION_SECRET,
      store: new pgSession({
        conString: `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
        crear_interval: 60 * 60 // sec
      }),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: false,
        maxAge: 60 * 60 * 1000 // msec
      }
    }));
  }
}
