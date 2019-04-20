import * as next from 'next';
import { Server } from 'next';

const dev = process.env.NODE_ENV !== 'production';

export class NextService {
  private initialized: boolean = false;
  private readonly app: Server;

  constructor() {
    this.app = next({ dev });
  }

  public async getNextApp(): Promise<Server> {
    if (!this.initialized) {
      await this.app.prepare();
    }
    return this.app;
  }
}
