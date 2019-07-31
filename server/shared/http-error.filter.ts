/** @format */

// #region Imports NPM
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
// #endregion
// #region Imports Local
import { NextService } from '../next/next.service';
// #endregion

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  constructor(private readonly nextService: NextService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // eslint-disable-next-line no-debugger
    debugger;

    if (response.status && request.method && request.url) {
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message.error || exception.message || null
            : 'Internal server error',
      };

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        Logger.error(
          `${request.method} ${request.url}`,
          exception.stack,
          'ExceptionFilter',
        );
      } else {
        Logger.error(
          `${request.method} ${request.url}`,
          JSON.stringify(errorResponse),
          'ExceptionFilter',
        );
      }

      response.status(status);
      this.nextService.error(request, response, status, exception);
    } else {
      Logger.error(`${request}`, exception.stack, 'ExceptionFilter');
    }
  }
}
