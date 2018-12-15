import { HttpServer, Injectable } from '@nestjs/common';
import { ErrorRenderer, Renderer, RequestHandler } from 'next';

@Injectable()
export class RenderService {
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private errorRenderer?: ErrorRenderer;
  private res?: any;
  private req?: any;
  private viewsDir: string | null = '/views';

  public setViewsDir(path: string | null) {
    this.viewsDir = path;
  }

  public getViewsDir() {
    return this.viewsDir;
  }

  public setRequestHandler(handler: RequestHandler) {
    this.requestHandler = handler;
  }

  public getRequestHandler(): RequestHandler | undefined {
    return this.requestHandler;
  }

  public setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  public getRenderer(): Renderer | undefined {
    return this.renderer;
  }

  public setErrorRenderer(errorRenderer: ErrorRenderer) {
    this.errorRenderer = errorRenderer;
  }

  public getErrorRenderer(): ErrorRenderer | undefined {
    return this.errorRenderer;
  }

  public next(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  public bindHttpServer(server: HttpServer) {
    server.render = (_: any, view: string, options: any) => {
      const renderer = this.getRenderer();

      if (this.req && this.res && renderer) {
        return renderer(this.req, this.res, this.getViewPath(view), options);
      } else if (!this.req) {
        throw new Error('RenderService: req is not defined.');
      } else if (!this.res) {
        throw new Error('RenderService: res is not defined.');
      } else if (!renderer) {
        throw new Error('RenderService: renderer is not set.');
      }

      throw new Error('RenderService: failed to render');
    };
  }

  protected getViewPath(view: string) {
    const baseDir = this.getViewsDir();
    const basePath = baseDir ? baseDir : '';
    return `${basePath}/${view}`;
  }
}
