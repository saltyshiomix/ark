/** @format */

// #region Imports NPM
import { Module } from '@nestjs/common';
// #endregion
// #region Imports Local
import { AppLogger } from './logger.service';
// #endregion

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
