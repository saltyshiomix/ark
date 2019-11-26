import { Module } from '@nestjs/common';
import next from 'next';
import { ServerConstructor } from 'next/dist/next-server/server/next-server';
import { NextService } from './next.service';

type NextServerConstructor = Omit<ServerConstructor, 'staticMarkup'> & {
  dev?: boolean;
}

@Module({
  providers: [
    NextService,
  ],
  exports: [
    NextService,
  ],
})
export class NextModule {
  constructor(
    private readonly next: NextService,
  ) {}

  public async prepare(options?: NextServerConstructor) {
    const app = next(Object.assign({
      dev: process.env.NODE_ENV !== 'production',
      dir: process.cwd(),
    }, options || {}));
    return app.prepare().then(() => this.next.setApp(app));
  }
}
