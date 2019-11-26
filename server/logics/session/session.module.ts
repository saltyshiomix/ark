import {
  Module,
  INestApplication,
} from '@nestjs/common';
import session from 'express-session';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    EnvModule,
  ],
})
export class SessionModule {
  constructor(
    private readonly env: EnvService,
  ) {}

  public initialize(app: INestApplication) {
    const secret = this.env.get('APP_SESSION_SECRET');
    const username = this.env.get('DB_USERNAME');
    const password = this.env.get('DB_PASSWORD');
    const database = this.env.get('DB_DATABASE');
    const host = this.env.get('DB_HOST');
    const port = this.env.get('DB_PORT');
    const crear_interval = 7 * 24 * 60 * 60; // one week

    const pgSession = require('connect-pg-simple')(session);
    app.use(session({
      secret,
      store: new pgSession({
        conString: `postgres://${username}:${password}@${host}:${port}/${database}`,
        crear_interval,
      }),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: false,
        maxAge: crear_interval * 1000,
      },
    }));
  }
}
