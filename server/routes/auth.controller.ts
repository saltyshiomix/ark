import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { NextService } from '../logics/next/next.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly next: NextService,
  ) {}

  @Get('register')
  public showRegister(@Req() req, @Res() res) {
    return this.next.render('/auth/register', req, res);
  }

  @Get('login')
  public showLogin(@Req() req, @Res() res) {
    return this.next.render('/auth/login', req, res);
  }
}
