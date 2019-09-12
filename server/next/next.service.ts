import {
  Res,
  Req,
} from '@nestjs/common';
import next from 'next';
import Server from 'next-server/dist/server/next-server';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  private app: Server;
  private handler: any;

  public async getApp(): Promise<Server> {
    if (!this.app) {
      this.app = next({ dev });
      this.handler = this.app.getRequestHandler();
      await this.app.prepare();
    }
    return this.app;
  }

  public async render(@Req() req: Request, @Res() res: Response, page: string) {
    if (!this.app) {
      this.app = await this.getApp();
    }
    return this.app.render(req, res, page, req.query);
  }

  public async getRequestHandler(): Promise<any> {
    if (!this.handler) {
      this.handler = (await this.getApp()).getRequestHandler();
    }
    return this.handler;
  }
}
