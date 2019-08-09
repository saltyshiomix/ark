/** @format */

// #region Imports NPM
import { IncomingMessage } from 'http';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
// #endregion
// #region Imports Local
import { AuthService } from '../auth/auth.service';
// #endregion

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const gqlCtx: any = gqlContext.getContext();

    let canActivate: boolean | Observable<boolean>;

    if (gqlCtx instanceof Function) {
      canActivate = await super.canActivate(context);
    } else {
      gqlContext.switchToHttp = () => (this as unknown) as HttpArgumentsHost;
      canActivate = await super.canActivate(gqlContext);
    }

    return canActivate instanceof Observable ? canActivate.toPromise() : canActivate;
  }

  handleRequest(err: Error, user: any, info: any, context: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  getResponse = () => undefined;

  getRequest(context: ExecutionContext): IncomingMessage {
    const gqlContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
    if (gqlContext.getContext() instanceof Function) {
      return context.switchToHttp().getRequest();
    }
    return gqlContext.getContext().req;
  }
}
