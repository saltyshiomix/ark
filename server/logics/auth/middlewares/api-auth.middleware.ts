import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next();
    }
    throw new UnauthorizedException();
  }
}
