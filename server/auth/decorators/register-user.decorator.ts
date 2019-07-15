/** @format */

import { createParamDecorator } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';

export const RegisterUser = createParamDecorator(
  (_data, req): RegisterUserDto => {
    const { name, email, password }: RegisterUserDto = req.body;
    return { name, email, password };
  },
);
