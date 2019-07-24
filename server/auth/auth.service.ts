/** @format */

// #region Imports NPM
import { Injectable } from '@nestjs/common';
// #endregion
// #region Imports Local
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
// #endregion

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  public async validateUserByEmail(email: string): Promise<User | undefined> {
    // return this.service.findOneByEmail(email);
    return undefined;
  }

  public async registerUserIfNotExist(
    registerUserDto: RegisterUserDto,
  ): Promise<User> {
    // let user: User | undefined = await this.validateUserByEmail(
    //   registerUserDto.email,
    // );
    // if (user) {
    //   return user;
    // }
    // const { name, email, password } = registerUserDto;
    // user = await this.service.create({ name, email, password });
    // return this.service.save(user);
    return {};
  }
}
