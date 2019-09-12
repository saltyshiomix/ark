import { Module } from '@nestjs/common';
import next from 'next';
import { NextService } from './next.service';

const dev: boolean = process.env.NODE_ENV !== 'production';

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

  public async prepare() {
    const app = next({
      dev,
      dir: process.cwd(),
    });

    if (dev) {
      console.log('[ ARK ] Preparing Next.js ...');
    }

    return app.prepare().then(() => this.next.setApp(app));
  }
}
