/** @format */

import { Injectable, NestMiddleware, Header } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextService } from './next.service';

@Injectable()
export class NextMiddleware implements NestMiddleware {
  constructor(private readonly nextService: NextService) {}

  @Header('content-type', 'text/javascript')
  public async use(
    req: Request,
    res: Response,
    _next: Function,
  ): Promise<void> {
    const app = await this.nextService.getApp();
    const handle = app.getRequestHandler();
    return handle(req, res);
  }
}
