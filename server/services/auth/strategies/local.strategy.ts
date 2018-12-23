import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../../entities/users/user.entity';

@Injectable()
export class LocalSignupStrategy extends PassportStrategy(Strategy, 'local-signup') {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  public async validate(req, email, password) {
    const { name } = req.body;
    password = await hash(password, 8);
    const user: User = await this.service.createUserIfNotExist({ name, email, password });
    if (user) {
      return user;
    }
    return false;
  }
}

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(Strategy, 'local-login') {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  public async validate(email, password) {
    const user: User = await this.service.validateUser(email);
    if (!user) {
      return false;
    }
    if (!await compare(password, user.password)) {
      return false;
    }
    return user;
  }
}
