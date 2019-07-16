/** @format */

import { Res, Req } from '@nestjs/common';
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

  public async render(
    @Req() req: Request,
    @Res() res: Response,
    page: string,
  ): Promise<void> {
    return (await this.getApp()).render(req, res, page, req.query);
  }
}
