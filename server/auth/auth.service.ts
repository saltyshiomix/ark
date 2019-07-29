/** @format */

// #region Imports NPM
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// #endregion
// #region Imports Local
import { UsersService } from '../users/users.service';
// #endregion

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    return { username, password };
  }

  public async login(user: any): Promise<any> {
    const payload = { username: user };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
