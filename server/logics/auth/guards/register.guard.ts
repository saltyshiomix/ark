import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const [
      req,
      res,
      next,
    ] = [
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
      context.switchToHttp().getNext(),
    ];

    return new Promise((resolve) => {
      this.authService.passport.authenticate('local-register', (err, user) => {
        if (err || !user) {
          return resolve(false);
        }
        req.logIn(user, (err) => {
          if (err) {
            return resolve(false);
          }
          req.session.save((err) => {
            if (err) {
              return resolve(false);
            }
            return resolve(true);
          });
        });
      })(req, res, next);
    });
  }
}
