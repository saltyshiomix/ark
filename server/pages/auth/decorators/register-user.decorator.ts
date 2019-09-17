import { createParamDecorator } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';

export const RegisterUser = createParamDecorator((_data, req) => {
  const { name, email, password } = req.body;
  return { name, email, password } as RegisterUserDto;
});
