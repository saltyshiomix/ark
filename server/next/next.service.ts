/** @format */

// #region Imports NPM
import { Res, Req, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import next from 'next';
import Server from 'next-server/dist/server/next-server';
// #endregion

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  public app!: Server;

  constructor() {
    this.app = next({ dev, quiet: !dev });
    this.app.prepare();
  }

  public async error(
    req: Request,
    res: Response,
    status: number,
    exception: HttpException | unknown,
  ): Promise<void> {
    if (status === 404) {
      return this.app.render404(req, res);
    }

    const message =
      exception instanceof HttpException
        ? exception.toString()
        : 'Internal server error';

    return this.app.renderError(new Error(message), req, res, req.url);
  }

  public async render(
    @Req() req: Request,
    @Res() res: Response,
    page: string,
  ): Promise<void> {
    return this.app.render(req, res, page, req.query);
  }
}
