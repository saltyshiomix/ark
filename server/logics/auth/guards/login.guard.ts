import passport from 'passport';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class LoginGuard implements CanActivate {
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
      passport.authenticate('local-login', (err: any, user?: any) => {
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
