/** @format */

// #region Imports NPM
import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
// #endregion
// #region Imports Local
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from './user.service';
import { UserRO, UserDTO } from './user.dto';
// #endregion

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Query()
  // async users(@Args('page') page: number): Promise<any> {
  //   return this.userService.showAll(page);
  // }

  // @Query()
  // async user(@Args('username') username: string): Promise<any> {
  //   return this.userService.read(username);
  // }

  @Query()
  @UseGuards(new AuthGuard())
  async me(@Context('user') user: any): Promise<any> {
    // eslint-disable-next-line no-debugger
    debugger;

    const { id } = user;
    return this.userService.read(id);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<any> {
    const user: UserDTO = { username, password };
    return this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('middleName') middleName: string,
    @Args('birthday') birthday: string,
    @Args('addressPersonal') addressPersonal: string,
  ): Promise<any> {
    const user: UserRO = {
      username,
      password,
      firstName,
      lastName,
      middleName,
      birthday,
      addressPersonal,
      isAdmin: false,
    };
    return this.userService.register(user);
  }
}
