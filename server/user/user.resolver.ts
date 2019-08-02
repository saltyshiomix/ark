/** @format */

// #region Imports NPM
import {
  Resolver,
  Query,
  Args,
  // ResolveProperty,
  // Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
// #endregion
// #region Imports Local
import { UserService } from './user.service';
import { UserResponseDTO, UserRegisterDTO } from './models/user.dto';
import { AuthenticationGuard } from '../guards/auth-guard.guard';
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
  @UseGuards(AuthenticationGuard)
  async me(@Context('req') req: Request): Promise<UserResponseDTO | null> {
    return req.user;
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<UserResponseDTO | null> {
    return this.userService.login({ username, password });
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('middleName') middleName: string,
    @Args('birthday') birthday: Date,
    @Args('addressPersonal') addressPersonal: string,
  ): Promise<UserResponseDTO | null> {
    const user: UserRegisterDTO = {
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
