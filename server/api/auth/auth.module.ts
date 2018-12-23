import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { authenticate } from 'passport';
import { EnvModule } from '../../services/env/env.module'
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalRegisterStrategy, LocalLoginStrategy } from './strategies/local.strategy';

@Module({
  imports: [EnvModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalRegisterStrategy, LocalLoginStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('local-register')).forRoutes({ path: '/api/auth/register', method: RequestMethod.POST })
      .apply(authenticate('local-login')).forRoutes({ path: '/api/auth/login', method: RequestMethod.POST });
  }
}
