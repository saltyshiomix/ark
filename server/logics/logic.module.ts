import {
  Module,
  INestApplication,
} from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EnvModule,
    SessionModule,
    AuthModule,
    UserModule,
  ],
})
export class LogicModule {
  public initialize(app: INestApplication) {
    // enable session store in PostgreSQL
    app.get(SessionModule).initialize(app);

    // enable passport session
    // NOTE: we must use this at the end of `app.use()` list
    app.get(AuthModule).initialize(app);
  }
}
