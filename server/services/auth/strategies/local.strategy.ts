import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../../entities/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (req, email, password, cb) => {
      if (req.url === '/auth/signup') {
        const name: string = req.body.name;
        password = await hash(password, 8);
        const user: User = await this.service.createUserIfNotExist({ name, email, password });
        if (user) {
          return cb(null, user);
        }
        return cb(null, false);
      } else {
        let user: User = await this.service.validateUser(email);
        if (!user) {
          return cb(null, false);
        }
        if (!await compare(password, user.password)) {
          return cb(null, false);
        }
        return cb(null, user);
      }
    });
  }
}
