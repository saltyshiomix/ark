/** @format */

// #region Imports NPM
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// #endregion
// #region Imports Local
import { JwtPayload } from './jwt-payload.interface';
// import { UsersService } from '../users/users.service';
// #endregion

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async validateUser(
    _username: string,
    _password: string,
  ): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    // eslint-disable-next-line no-debugger
    debugger;

    return null;
  }

  public async login(userid: JwtPayload): Promise<{}> {
    // eslint-disable-next-line no-debugger
    debugger;

    return {
      token: this.jwtService.sign({ ...userid }),
    };
  }
}
