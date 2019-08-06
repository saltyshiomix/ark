/** @format */

// #region Imports NPM
import { Controller, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
// #endregion
// #region Imports Local
import { NextService } from '../next/next.service';
// #endregion

@Controller()
export class HomeController {
  constructor(private readonly nextService: NextService) {}

  @Get()
  public async showHome(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      return this.nextService.render(req, res, '/index');
    }
    return res.redirect('auth/login');
  }

  @Get('/auth/login')
  public async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.nextService.render(req, res, '/auth/login');
  }

  @Get('/auth/logout')
  public async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.nextService.render(req, res, '/auth/logout');
  }

  // @Get('/static/:id')
  // async image(@Param('id') id, @Res() res): Promise<void> {
  //   const imagePath = getImgPath(id);
  //   return res.sendFile(imagePath, { root: 'static' });
  // }
}
