import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextService } from './next.service';

@Injectable()
export class NextMiddleware implements NestMiddleware {
  constructor(
    private readonly next: NextService,
  ) {}

  public use(req: IncomingMessage, res: ServerResponse) {
    const handle = this.next.getApp().getRequestHandler();
    handle(req, res);
  }
}
