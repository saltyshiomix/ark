import {
  Res,
  Req,
} from '@nestjs/common';
import next from 'next';
import { Server } from 'next';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  private app!: Server;

  public async getApp(): Promise<Server> {
    if (!this.app) {
      this.app = next({ dev });
      await this.app.prepare();
    }
    return this.app;
  }

  public async render(@Req() req: Request, @Res() res: Response, page: string) {
    return (await this.getApp()).render(req, res, page, req.query);
  }
}
