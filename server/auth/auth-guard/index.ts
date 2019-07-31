/** @format */

// #region Imports NPM
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
// #endregion

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): any {
    // eslint-disable-next-line no-debugger
    debugger;

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
