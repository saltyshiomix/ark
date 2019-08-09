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
      try {
        this.app = next({ dev, quiet: !dev });
        this.handler = this.app.getRequestHandler();

        await this.app.prepare();
      } catch (error) {
        console.error('Next service error (getApp):', error);
      }
    }
    return this.app;
  }

  public async getRequestHandler(): Promise<any> {
    if (!this.app) {
      try {
        const app = await this.getApp();
        this.handler = app.getRequestHandler();
      } catch (error) {
        console.error('Next service error (getRequestHandler):', error);
      }
    }
    return this.handler;
  }

  public async error(req: Request, res: Response, status: number, exception: HttpException | unknown): Promise<void> {
    try {
      const app = await this.getApp();

      if (status === 404) {
        return app.render404(req, res);
      }

      const message = exception instanceof HttpException ? exception.toString() : 'Internal server error';
      return app.renderError(new Error(message), req, res, req.url, req.query);
    } catch (error) {
      console.error('Next service error:', error);
      throw error;
    }
  }

  public async render(@Req() req: Request, @Res() res: Response, page: string): Promise<void> {
    try {
      const app = await this.getApp();
      return app.render(req, res, page, req.query);
    } catch (error) {
      console.error('Next service error (render):', error);
      throw error;
    }
  }
}
