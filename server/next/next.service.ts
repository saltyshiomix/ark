import {
  Request,
  Response,
} from 'express';
import Server from 'next-server/dist/server/next-server';

export class NextService {
  private app: Server;

  public setApp(app: Server) {
    this.app = app;
  }

  public getApp(): Server {
    return this.app;
  }

  public render(page: string, req: Request, res: Response) {
    this.app.render(req, res, page, req.query);
  }

  public renderWithData(page: string, data: any, req: Request, res: Response) {
    this.app.render(req, res, page, data);
  }
}
