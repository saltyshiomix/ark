import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { LocalRegisterStrategy } from './strategies/local-register.stratery';

@Module({
  imports: [
    UserModule,
  ],
  providers: [
    AuthService,
    LocalLoginStrategy,
    LocalRegisterStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
