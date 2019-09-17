import { Module } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PassportModule } from '@nestpress/passport';
import { SessionModule } from './session/session.module';
import { EnvModule } from './env/env.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PassportModule,
    SessionModule,
    EnvModule,
    UserModule,
    AuthModule,
  ],
})
export class LogicModule {
  public initialize(app: NestExpressApplication) {
    // enable session store in PostgreSQL
    app.get(SessionModule).initialize(app);

    // enable passport session
    // NOTE: we must use this at the end of `app.use()` list
    app.get(PassportModule).initialize(app);
  }
}
