import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';
import { NextService } from '@nestpress/next';

@Controller()
export class HomeController {
  constructor(
    private readonly nextService: NextService,
  ) {}

  @Get()
  public showHome(@Req() req: Request, @Res() res: Response) {
    return this.nextService.render('/index', req, res);
  }
}
