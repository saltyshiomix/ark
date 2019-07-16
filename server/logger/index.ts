/** @format */

// #region Imports NPM
import { LoggerService } from '@nestjs/common';
// #endregion

export class AppLogger implements LoggerService {
  log(message: string): void {
    console.log(message);
  }

  error(message: string, trace: string): void {
    console.error(message, trace);
  }

  warn(message: string): void {
    console.warn(message);
  }

  debug(message: string): void {
    console.debug(message);
  }

  verbose(message: string): void {
    console.info(message);
  }
}
