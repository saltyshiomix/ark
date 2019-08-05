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

export enum LoginIdentificator {
  NULL = '',
  GUID = 'GUID',
}

// #region User
export class UserDTO {
  id: string;

  loginService: LoginService;

  loginIdentificator: LoginIdentificator;

  username: string;

  firstName: string;

  lastName: string;

  middleName: string;

  birthday: Date;

  addressPersonal: string;

  isAdmin: boolean;

  createdAt: Date;

  updatedAt: Date;
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

  addressPersonal: string;

  isAdmin: boolean;

  loginService: LoginService;

  loginIdentificator: LoginIdentificator;
}
// #endregion
