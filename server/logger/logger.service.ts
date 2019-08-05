/** @format */

// #region Imports NPM
import { Logger } from '@nestjs/common';
// #endregion

export class AppLogger extends Logger {
  log(message: any, context?: string): void {
    super.log(message, context);
  }

  error(message: any, trace?: string, context?: string): void {
    super.error(message, trace, context);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context);
  }

  debug(message: any, context?: string): void {
    super.debug(message, context);
  }

  verbose(message: any, context?: string): void {
    super.verbose(message, context);
  }
}
