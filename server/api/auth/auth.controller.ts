import { authenticate } from 'passport';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Next,
  ValidationPipe
} from '@nestjs/common';
import { RegisterUser } from './decorators/register-user.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUser } from './decorators/login-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/auth')
export class AuthController {
  @Post('register')
  public async register(@RegisterUser(new ValidationPipe) user: RegisterUserDto, @Req() req, @Res() res, @Next() next) {
    authenticate('local-register', (err, user) => {
      req.logIn(user, (err) => {
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
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
