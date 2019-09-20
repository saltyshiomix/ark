import bcrypt from 'bcrypt';
import {
  Strategy,
  IStrategyOptions,
  VerifyFunction,
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-local';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  public getLocalRegisterStrategy(): Strategy {
    const options: IStrategyOptionsWithRequest = {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    };

    const verify: VerifyFunctionWithRequest  = async (req: Request, email: string, password: string, done: (err: any, user?: any) => void): Promise<void> => {
      const { name } = req.body;
      const user: any = await this.registerUserIfNotExist(name, email, password );
      if (!user) {
        return done(new UnauthorizedException, user);
      }
      return done(null, user);
    };

    const LocalRegisterStrategy = new Strategy(options, verify);

    LocalRegisterStrategy.name = 'local-register';

    return LocalRegisterStrategy;
  }

  public getLocalLoginStrategy(): Strategy {
    const options: IStrategyOptions = {
      usernameField: 'email',
      passwordField: 'password',
    };

    const verify: VerifyFunction  = async (email: string, password: string, done: (err: any, user?: any) => void) => {
      const user: any = await this.validateUser(email, password);
      if (!user) {
        return done(new UnauthorizedException, null);
      }
      return done(null, user);
    };

    const LocalLoginStrategy = new Strategy(options, verify);

    LocalLoginStrategy.name = 'local-login';

    return LocalLoginStrategy;
  }

  private async registerUserIfNotExist(name: string, email: string, password: string): Promise<any> {
    let user: User | undefined = await this.userService.findOneByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    user = await this.userService.save(await this.userService.create({
      name,
      email,
      password,
    }));

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  private async validateUser(email: string, password: string): Promise<any> {
    const user: User | undefined = await this.userService.findOneByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
