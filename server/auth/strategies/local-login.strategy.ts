/** @format */

// import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(
  Strategy,
  'local-login',
) {
  // constructor(private readonly service: AuthService) {
  //   super({
  //     usernameField: 'email',
  //     passwordField: 'password',
  //   });
  // }

  public async validate(
    _email: string,
    _password: string,
  ): Promise<User | boolean> {
    return false;
    // const user: User | undefined = await this.service.validateUserByEmail(
    //   email,
    // );
    // if (!user) {
    //   return false;
    // }
    // if (!(await compare(password, user.password))) {
    //   return false;
    // }
    // return user;
  }
}
