import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { NextService } from '@nestpress/next';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly nextService: NextService,
  ) {}

  @Get('register')
  public showRegister(@Req() req, @Res() res) {
    return this.nextService.render('/auth/register', req, res);
  }

  @Get('login')
  public showLogin(@Req() req, @Res() res) {
    return this.nextService.render('/auth/login', req, res);
  }
}
