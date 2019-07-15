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
  public async showRegister(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.nextService.render(req, res, '/auth/register');
  }

  @Post('register')
  public async register(
    @RegisterUser(new ValidationPipe) _user: RegisterUserDto,
    @Req() req: RequestWithSession,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    authenticate('local-register', (_error, user) => {
      req.logIn(user, (_err) => {
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('login')
  public async showLogin(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.nextService.render(req, res, '/auth/login');
  }

  @Post('login')
  public async login(
    @LoginUser(new ValidationPipe) _user: LoginUserDto,
    @Req() req: RequestWithSession,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<void> {
    authenticate('local-login', (_error, user) => {
      req.logIn(user, (_err) => {
        req.session.save(() => res.json(req.user));
      });
    })(req, res, next);
  }

  @Get('logout')
  public async logout(@Req() req: RequestWithSession, @Res() res: Response): Promise<void> {
    req.session.destroy(() => res.json(true));
  }
}
