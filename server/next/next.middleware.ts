/** @format */

// #region Imports NPM
import { Injectable, NestMiddleware, Header } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextService } from './next.service';
// #endregion

@Injectable()
export class NextMiddleware implements NestMiddleware {
  constructor(private readonly nextService: NextService) {}

  @Header('content-type', 'text/javascript')
  public async use(
    req: Request,
    res: Response,
    _next: Function,
  ): Promise<void> {
    return this.nextService.app.getRequestHandler()(req, res);
  }
}
