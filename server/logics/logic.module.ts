import { Module } from '@nestjs/common';
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
export class LogicModule {}
