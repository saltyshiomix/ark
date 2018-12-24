import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../../entities/user.entity';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(Strategy, 'local-login') {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  public async validate(email, password) {
    const user: User = await this.service.validateUserByEmail(email);
    if (!user) {
      return false;
    }
    if (!await compare(password, user.password)) {
      return false;
    }
    return user;
  }
}
