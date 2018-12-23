import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { authenticate } from 'passport';
import { EnvModule } from '../env/env.module'
import { UsersModule } from '../../entities/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalSignupStrategy, LocalLoginStrategy } from './strategies/local.strategy';

@Module({
  imports: [EnvModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalSignupStrategy, LocalLoginStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('local-signup')).forRoutes({ path: '/auth/signup', method: RequestMethod.POST })
      .apply(authenticate('local-login')).forRoutes({ path: '/auth/login', method: RequestMethod.POST });
  }
}
