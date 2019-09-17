import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';
import { AuthGuard } from '@nestjs/passport';
import { NextService } from '@nestpress/next';
import { User } from '../entities/user.entity';

interface RequestWithUserSession extends Request {
  user: User;
  session: any;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly nextService: NextService,
  ) {}

  @Get('register')
  public showRegister(@Req() req: Request, @Res() res: Response) {
    return this.nextService.render('/auth/register', req, res);
  }

  @Post('register')
  @UseGuards(AuthGuard('local-register'))
  public register(@Req() req: RequestWithUserSession, @Res() res: Response) {
    this.performLogin(req, res);
  }

  @Get('login')
  public showLogin(@Req() req: Request, @Res() res: Response) {
    return this.nextService.render('/auth/login', req, res);
  }

  @Post('login')
  @UseGuards(AuthGuard('local-login'))
  public login(@Req() req: RequestWithUserSession, @Res() res: Response) {
    this.performLogin(req, res);
  }

  @Get('logout')
  public logout(@Req() req: RequestWithUserSession, @Res() res: Response) {
    req.session.destroy(() => res.redirect('/auth/login'));
  }

  private performLogin(req: RequestWithUserSession, res: Response) {
    if (!req.user) {
      res.json(false);
    }
    req.logIn(req.user, err => {
      if (err) {
        return res.json(false);
      }
      return res.json(req.user);
    });
  }
}
