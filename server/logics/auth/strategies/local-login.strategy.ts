import { Strategy } from 'passport-local';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalLoginStrategy extends Strategy {
  public name: string = 'local-login';

  constructor(
    private readonly authService: AuthService,
  ) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: (err: any, user?: any) => void) => {
        const user: any = await this.authService.validateUser(email, password);
        if (!user) {
          return done(new UnauthorizedException, null);
        }
        return done(null, user);
      },
    );
  }
}
