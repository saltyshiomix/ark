/** @format */

// #region Imports NPM
import { IsNotEmpty } from 'class-validator';
// #endregion
// #region Imports Local
// #endregion

export enum LoginService {
  LOCAL = 'local',
  LDAP = 'ldap',
}

export enum Gender {
  MAN,
  WOMAN,
  UNKNOWN,
}

// #region User
export class UserDTO {
  id?: string;

  password?: string;

  loginService: LoginService;

  loginIdentificator: string;

  username: string;

  firstName: string;

  lastName: string;

  middleName: string;

  birthday: Date;

  gender: Gender;

  addressPersonal: string;

  isAdmin: boolean;

  company: string;

  title: string;

  thumbnailPhoto?: Buffer;

  createdAt?: Date;

  updatedAt?: Date;
}
// #endregion

// #region User response
export class UserResponseDTO extends UserDTO {
  token: string;
}
// #endregion

// #region User login
export class UserLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
// #endregion

// #region User register
export class UserRegisterDTO {
  username: string;

  password: string;

  firstName: string;

  lastName: string;

  middleName: string;

  birthday: Date;

  gender: Gender;

  addressPersonal: string;

  isAdmin: boolean;

  company: string;

  title: string;

  thumbnailPhoto: Buffer;
}
// #endregion
