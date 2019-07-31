/** @format */

// #region Imports NPM
import { Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
// #endregion
// #region Imports Local
import { GqlAuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
// #endregion

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('ldapauth'))
  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    // eslint-disable-next-line no-debugger
    debugger;

    return this.authService.login(req.user);
  }

  @UseGuards(GqlAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request): Promise<any> {
    // eslint-disable-next-line no-debugger
    debugger;

    return req.user;
  }
}
