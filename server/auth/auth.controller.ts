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
  NextFunction,
} from 'express';
import { authenticate } from 'passport';
import { NextService } from '../next/next.service';
import { RegisterUser } from './decorators/register-user.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUser } from './decorators/login-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

interface RequestWithSession extends Request {
  session: any;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly nextService: NextService) {}

  @Get('register')
  public showRegister(@Req() req: Request, @Res() res: Response) {
    return this.nextService.render(req, res, '/auth/register');
  }

  @Post('register')
  public register(@RegisterUser(new ValidationPipe) _user: RegisterUserDto, @Req() req: RequestWithSession, @Res() res: Response, @Next() next: NextFunction) {
    authenticate('local-register', (err, user) => {
      if (err) {
        return res.json(false);
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json(false);
        }
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('login')
  public showLogin(@Req() req: Request, @Res() res: Response) {
    return this.nextService.render(req, res, '/auth/login');
  }

  @Post('login')
  public login(@LoginUser(new ValidationPipe) _user: LoginUserDto, @Req() req: RequestWithSession, @Res() res: Response, @Next() next: NextFunction) {
    authenticate('local-login', (err, user) => {
      if (err) {
        return res.json(false);
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.json(false);
        }
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('logout')
  public logout(@Req() req: RequestWithSession, @Res() res: Response) {
    req.session.destroy(() => res.redirect('/auth/login'));
  }
}
