import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { authenticate } from 'passport';
import { EnvModule } from '../env/env.module'
import { UsersModule } from '../../entities/users/users.module';
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
      .apply(authenticate('local-register')).forRoutes({ path: '/auth/register', method: RequestMethod.POST })
      .apply(authenticate('local-login')).forRoutes({ path: '/auth/login', method: RequestMethod.POST });
  }
}
