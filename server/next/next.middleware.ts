import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NextService } from './next.service';

@Injectable()
export class NextMiddleware implements NestMiddleware {
  constructor(private readonly nextService: NextService) {}

  public async use(req: Request, res: Response, next: Function) {
    const app = await this.nextService.getApp();

    res.render = (page: string, data?: any) => {
      return app.render(req, res, page, data);
    };

    next();
  }
}
