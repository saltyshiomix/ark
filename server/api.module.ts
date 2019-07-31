/** @format */

// #region Imports NPM
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
// #endregion
// #region Imports Local
import { NextService } from './next/next.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { NextModule } from './next/next.module';
// #endregion

@Module({
  imports: [UserModule, NextModule],
  providers: [
    // #region Errors: ExceptionFilter
    {
      provide: APP_FILTER,
      inject: [NextService],
      useFactory: (nextService: NextService) => {
        return new HttpErrorFilter(nextService);
      },
    },
    // #endregion
    // #region Logging interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // #endregion
  ],
  exports: [UserModule],
})
export class ApiModule {}
