/** @format */

// #region Imports NPM
import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
// #endregion
// #region Imports Local
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { User } from './user.decorator';
// #endregion

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  showAllUsers(@Query('page') page: number): any {
    return this.userService.showAll(page);
  }

  @Get('api/users/:id')
  showOneUser(@Param('id') id: number): any {
    return this.userService.read(id);
  }

  @Get('auth/me')
  @UseGuards(new AuthGuard())
  showMe(@User('id') id: number): any {
    return this.userService.read(id);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO): any {
    return this.userService.login(data);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO): any {
    return this.userService.register(data);
  }
}
