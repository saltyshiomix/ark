/** @format */

import { Res, Req, HttpException } from '@nestjs/common';
import next from 'next';
import Server from 'next-server/dist/server/next-server';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  private app!: Server;

  public async getApp(): Promise<Server> {
    if (!this.app) {
      this.app = next({ dev, quiet: !dev });
      await this.app.prepare();
    }
    return this.app;
  }

  public async error(
    req: Request,
    res: Response,
    status: number,
    exception: HttpException | unknown,
  ): Promise<void> {
    const app = await this.getApp();

    if (status === 404) {
      return app.render404(req, res);
    }

    const message =
      exception instanceof HttpException
        ? exception.toString()
        : 'Internal server error';

    return app.renderError(new Error(message), req, res, req.url);
  }

  public async render(
    @Req() req: Request,
    @Res() res: Response,
    page: string,
  ): Promise<void> {
    return (await this.getApp()).render(req, res, page, req.query);
  }
}
