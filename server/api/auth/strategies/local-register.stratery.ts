import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../../entities/user.entity';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(Strategy, 'local-register') {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  public async validate(req, email, password) {
    const { name } = req.body;
    const user: User = await this.service.registerUserIfNotExist({ name, email, password });
    if (user) {
      return user;
    }
    return false;
  }
}
