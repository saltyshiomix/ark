import { parse } from 'url';
import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { RenderService } from './render.service';

@Injectable()
export class RenderMiddleware implements NestMiddleware {
  public constructor(private readonly renderer: RenderService) {}

  public resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const { pathname } = parse(req.url, true);

      if (req.user) {
        const redirectIfAuthenticated = [
          '/auth/login',
          '/auth/signup'
        ];
        redirectIfAuthenticated.includes(pathname) && res.redirect('/');
      } else {
        const authGuards = [
          '/'
        ];
        authGuards.includes(pathname) && res.redirect('/auth/login');
      }

      this.renderer.next(req, res);
      if (next) {
        next();
      }
    };
  }
}
