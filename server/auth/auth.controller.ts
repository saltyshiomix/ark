/** @format */

// #region Imports NPM
import {
  Controller,
  Get,
  // Post,
  // UsePipes,
  // Body,
  Req,
  Res,
  // Query,
  // Param,
  // UseGuards,
  // Header,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
// #endregion
// #region Imports Local
// import { ValidationPipe } from '../shared/validation.pipe';
// import { AuthenticationGuard } from '../guards/auth-guard.guard';
// import {
//   // UserLoginDTO,
//   // UserRegisterDTO,
//   UserResponseDTO,
// } from '../user/models/user.dto';
// import { User } from '../user/user.decorator';
// import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
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
  public async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.nextService.render(req, res, '/auth/logout');
  }
}
