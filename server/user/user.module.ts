/** @format */

// #region Imports NPM
import { Module, forwardRef } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// #endregion
// #region Imports Local
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '../config/config.module';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';
// #endregion

@Module({
  imports: [
    // #region Config module
    ConfigModule,
    // #endregion

    // #region TypeORM
    TypeOrmModule.forFeature([UserEntity]),
    // #endregion

    // #region Authentication
    forwardRef(() => AuthModule),
    // #endregion
  ],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
