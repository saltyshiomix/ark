/** @format */

// #region Imports NPM
import { Controller, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
// #endregion
// #region Imports Local
// #endregion

@Controller()
export class AppController {
  @Get()
  public async showHome(
    @Req() req: Request,
    @Res() res: Response,
    next: Function,
  ): Promise<void> {
    // eslint-disable-next-line no-debugger
    debugger;

    next();
  }
}
