/** @format */

// #region Imports NPM
import { Res, Req, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import next from 'next';
import Server from 'next-server/dist/server/next-server';
// #endregion

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  private app!: Server;

  private handler: any;

  public async getApp(): Promise<Server> {
    if (!this.app) {
      this.app = next({ dev, quiet: !dev });
      this.handler = this.app.getRequestHandler();

      try {
        await this.app.prepare();
      } catch (error) {
        console.error('Next service error:', error);
      }
    }
    return this.app;
  }

  public async getRequestHandler(): Promise<any> {
    if (!this.app) {
      this.handler = (await this.getApp()).getRequestHandler();
    }
    return this.handler;
  }

  public async error(req: Request, res: Response, status: number, exception: HttpException | unknown): Promise<void> {
    if (status === 404) {
      return (await this.getApp()).render404(req, res);
    }

    const message = exception instanceof HttpException ? exception.toString() : 'Internal server error';

    return (await this.getApp()).renderError(new Error(message), req, res, req.url, req.query);
  }

  public async render(@Req() req: Request, @Res() res: Response, page: string): Promise<void> {
    return (await this.getApp()).render(req, res, page, req.query);
  }
}
