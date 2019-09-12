import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';
import { NextService } from './next.service';

@Injectable()
export class NextMiddleware implements NestMiddleware {
  constructor(
    private readonly next: NextService,
  ) {}

  public use(req: Request, res: Response) {
    const app = this.next.getApp();
    const handle = app.getRequestHandler();
    handle(req, res);
  }
}
