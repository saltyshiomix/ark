import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { RenderService } from './render.service';
import { redirectIfAuthenticated } from '../../api/auth/guards/redirect-if-authenticated';
import { redirectIfNotAuthenticated } from '../../api/auth/guards/redirect-if-not-authenticated';

@Injectable()
export class RenderMiddleware implements NestMiddleware {
  public constructor(private readonly renderer: RenderService) {}

  public resolve(): MiddlewareFunction {
    return (req, res, next) => {
      redirectIfAuthenticated(req, res);
      redirectIfNotAuthenticated(req, res);
      this.renderer.next(req, res);
      if (next) {
        next();
      }
    };
  }
}
