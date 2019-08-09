/** @format */

// #region Imports NPM
import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
// #endregion
// #region Imports Local
import { NextService } from '../next/next.service';
// #endregion

// @ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly nextService: NextService) {}

  @Get('login')
  public async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.nextService.render(req, res, '/auth/login');
  }

  @Get('logout')
  public async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.nextService.render(req, res, '/auth/logout');
  }
}
