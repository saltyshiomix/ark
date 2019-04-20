import { INestApplication, Module } from '@nestjs/common';
import { Server } from 'next';
import { NextService } from '../next/next.service';
import { RenderFilter } from './render.filter';
import { RenderMiddleware } from './render.middleware';
import { RenderService } from './render.service';

export interface RegisterOptions {
  viewsDir: null | string;
}

@Module({
  providers: [
    NextService,
    RenderService,
  ],
})
export class RenderModule {
  private app?: INestApplication;
  private server?: Server;

  constructor(
    private readonly nextService: NextService,
    private readonly service: RenderService,
  ) {}

  public async register(
    app: INestApplication,
    options: Partial<RegisterOptions> = {},
  ) {
    this.app = app;
    this.server = await this.nextService.getNextApp();

    this.service.setRequestHandler(this.server.getRequestHandler());
    this.service.setRenderer(this.server.render.bind(this.server));
    this.service.setErrorRenderer(this.server.renderError.bind(this.server));
    this.service.bindHttpServer(this.app.getHttpAdapter());

    this.app.use(new RenderMiddleware(this.service).use);
    this.app.useGlobalFilters(
      new RenderFilter(
        this.service.getRequestHandler()!,
        this.service.getErrorRenderer()!,
      ),
    );

    if (options.viewsDir !== undefined) {
      this.service.setViewsDir(options.viewsDir);
    }
  }
}
