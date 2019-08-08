/** @format */

// #region Imports NPM
import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler, Type } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// #endregion

export interface AppGraphQLExecutionContext extends GraphQLExecutionContext {
  constructorRef?: Type<any>;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    if (req) {
      const { method, url } = req;

      return next
        .handle()
        .pipe(tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)));
    }

    const ctx: AppGraphQLExecutionContext = GqlExecutionContext.create(context);
    const resolverName = ctx.constructorRef && ctx.constructorRef.name;
    const info = ctx.getInfo();

    return next
      .handle()
      .pipe(tap(() => Logger.log(`${info.parentType.name} "${info.fieldName}" ${Date.now() - now}ms`, resolverName)));
  }
}
