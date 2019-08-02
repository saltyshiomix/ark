/** @format */

// #region Imports NPM
import {
  Controller,
  Get,
  // Post,
  // UsePipes,
  // Body,
  Req,
  // Query,
  // Param,
  UseGuards,
  Header,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
// #endregion
// #region Imports Local
// import { ValidationPipe } from '../shared/validation.pipe';
import { AuthenticationGuard } from '../guards/auth-guard.guard';
import {
  // UserLoginDTO,
  // UserRegisterDTO,
  UserResponseDTO,
} from '../user/models/user.dto';
// import { User } from '../user/user.decorator';
import { AuthService } from './auth.service';
// import { UserService } from '../user/user.service';
// #endregion

@ApiUseTags('auth')
@Controller('api/auth')
export class AuthController {
  // constructor() // private readonly authService: AuthService, // private readonly userService: UserService,
  // {}

  @Header('content-type', 'text/json')
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Get('me')
  showMe(@Req() req: Request): any {
    return req.user;
  }

  // @Header('content-type', 'text/json')
  // @UsePipes(new ValidationPipe())
  // @Post('login')
  // login(@Body() data: UserLoginDTO): Promise<UserResponseDTO | null> {
  //   return this.userService.login(data);
  // }

  // @UsePipes(new ValidationPipe())
  // @Post('register')
  // register(@Body() data: UserRegisterDTO): Promise<UserResponseDTO> {
  //   return this.authService.register(data);
  // }
}
