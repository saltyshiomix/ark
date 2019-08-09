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
import {
  UserResponseDTO,
} from './models/user.dto';
import { AuthenticationGuard } from '../guards/auth-guard.guard';
// #endregion

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseGuards(AuthenticationGuard)
  async me(@Context('req') req: Request): Promise<UserResponseDTO | null> {
    return req.user;
  }

  @Mutation()
  async login(@Args('username') username: string, @Args('password') password: string): Promise<UserResponseDTO | null> {
    return this.userService.login({ username, password });
  }
}
