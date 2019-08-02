/** @format */

// #region Imports NPM
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
// #endregion
// #region Imports Local
import { NextService } from '../next/next.service';
import { AppGraphQLExecutionContext } from './logging.interceptor';
// #endregion

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  constructor(private readonly nextService: NextService) {}

  catch(exception: HttpException, host: ExecutionContext): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof JsonWebTokenError ||
      exception instanceof TokenExpiredError
        ? HttpStatus.UNAUTHORIZED
        : exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (response.status && request.method && request.url) {
      // #region HTTP query
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleString('ru'),
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

      if (request.url.startsWith('/api/')) {
        response.json(errorResponse);
      } else {
        this.nextService.error(request, response, status, exception);
      }
      // #endregion
    } else {
      // #region GraphQL query
      const context: AppGraphQLExecutionContext = GqlExecutionContext.create(
        host,
      );
      const resolverName = context.constructorRef
        ? context.constructorRef.name
        : '';
      const info = context.getInfo();

      Logger.error(
        `${info.parentType} "${info.fieldName}" ${resolverName}`,
        exception.stack,
        'ExceptionFilter',
        true,
      );
      // #endregion
    }
  }
}
