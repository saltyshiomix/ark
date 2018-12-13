import { parse } from 'url';
import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { RenderService } from './render.service';

@Injectable()
export class RenderMiddleware implements NestMiddleware {
  public constructor(private readonly renderService: RenderService) {}

  public resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      // authentication guards
      if (!req.user) {
        const { pathname } = parse(req.url, true);
        
        if (pathname === '/profile') {
          res.redirect('/auth/login');
        }
      }

      this.renderService.next(req, res);
      if (next) {
        next();
      }
    };
  }
}
