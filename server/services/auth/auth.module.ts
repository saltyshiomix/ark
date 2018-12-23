import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { authenticate } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '../env/env.module'
import { UsersModule } from '../../entities/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    EnvModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('local', { failureRedirect: '/auth/signup' })).forRoutes({ path: '/auth/signup', method: RequestMethod.POST })
      .apply(authenticate('local', { failureRedirect: '/auth/login' })).forRoutes({ path: '/auth/login', method: RequestMethod.POST });
  }
}
