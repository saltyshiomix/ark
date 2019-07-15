/** @format */

import { createParamDecorator } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';

export const LoginUser = createParamDecorator(
  (_data, req): LoginUserDto => {
    const { email, password }: LoginUserDto = req.body;
    return { email, password };
  },
);
