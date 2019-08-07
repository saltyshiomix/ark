/** @format */

// #region Imports NPM
import { Injectable, NestMiddleware, Header } from '@nestjs/common';
import { Request, Response } from 'express';
// #endregion
// #region Imports Local
import { NextService } from './next.service';
// #endregion

@Injectable()
export class NextAssetsMiddleware implements NestMiddleware {
  constructor(private readonly nextService: NextService) {}

  @Header('content-type', 'text/javascript')
  public async use(req: Request, res: Response): Promise<void> {
    return (await this.nextService.getRequestHandler())(req, res);
  }
}
