import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

@Injectable()
export class RedirectIfNotAuthenticatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.redirect('/auth/login');
    }
    return next();
  }
}
