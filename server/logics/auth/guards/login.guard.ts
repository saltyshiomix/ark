import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
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

    return new Promise((resolve, reject) => {
      this.authService.passport.authenticate('local-login', (err, user) => {
        if (err) {
          reject(false);
        }
        req.logIn(user, (err) => {
          if (err) {
            return reject(false);
          }
          req.session.save((err) => {
            if (err) {
              return reject(false);
            }
            return resolve(true);
          });
        });
      })(req, res, next);
    });
  }
}
