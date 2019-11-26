import {
  IncomingMessage,
  ServerResponse,
} from 'http';

export class NextService {
  private app!: any;

  public setApp(app: any): void {
    this.app = app;
  }

  public getApp(): any {
    return this.app;
  }

  public async render(page: string, req: IncomingMessage, res: ServerResponse): Promise<void>

  public async render(page: string, data: any, req: IncomingMessage, res: ServerResponse): Promise<void>

  public async render(page: string, arg2: any, arg3: any, arg4?: any): Promise<void> {
    if (this.isIncomingMessage(arg2)) {
      await this.app.render(arg2, arg3, page);
    } else {
      await this.app.render(arg3, arg4, page, arg2);
    }
  }

  private isIncomingMessage(arg: any): arg is IncomingMessage {
    return typeof arg.httpVersion === 'string';
  }
}
