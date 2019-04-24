import { authenticate } from 'passport';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Next,
  ValidationPipe,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';
import { NextService } from '../next/next.service';
import { RegisterUser } from './decorators/register-user.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUser } from './decorators/login-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly nextService: NextService) {}

  @Get('register')
  public async showRegister(@Req() req: Request, @Res() res: Response) {
    return await this.nextService.render(req, res, '/auth/register');
  }

  @Post('register')
  public async register(@RegisterUser(new ValidationPipe) user: RegisterUserDto, @Req() req, @Res() res, @Next() next) {
    authenticate('local-register', (err, user) => {
      req.logIn(user, (err) => {
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('login')
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    return await this.nextService.render(req, res, '/auth/login');
  }

  @Post('login')
  public async login(@LoginUser(new ValidationPipe) user: LoginUserDto, @Req() req, @Res() res, @Next() next) {
    authenticate('local-login', (err, user) => {
      req.logIn(user, (err) => {
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('logout')
  public async logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.json(true));
  }
}
