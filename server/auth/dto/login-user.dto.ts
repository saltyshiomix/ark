/** @format */

import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @MinLength(4, {
    message: 'Minimal length is $constraint1 characters, but actual is $value',
  })
  readonly password: string;
}
