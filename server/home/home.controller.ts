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
import { NextService } from '../next/next.service';

@Controller()
export class HomeController {
  constructor(private readonly nextService: NextService) {}

  @Get()
  public async showHome(@Req() req: Request, @Res() res: Response): Promise<void> {
    if (req.user) {
      return this.nextService.render(req, res, '/index');
    }
    return res.redirect('auth/login');
  }
}
