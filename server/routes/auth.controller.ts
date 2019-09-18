import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextService } from '@nestpress/next';
import {
  RegisterGuard,
  LoginGuard,
} from '../logics/auth/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly nextService: NextService,
  ) {}

  @Get('register')
  public showRegister(@Req() req, @Res() res) {
    return this.nextService.render('/auth/register', req, res);
  }

  @Post('register')
  @UseGuards(RegisterGuard)
  public register(@Req() req, @Res() res) {
    res.json(req.user);
  }

  @Get('login')
  public showLogin(@Req() req, @Res() res) {
    return this.nextService.render('/auth/login', req, res);
  }

  @Post('login')
  @UseGuards(LoginGuard)
  public login(@Req() req, @Res() res) {
    res.json(req.user);
  }

  @Get('logout')
  public logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.redirect('/auth/login'));
  }
}
