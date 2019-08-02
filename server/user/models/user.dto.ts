/** @format */

// #region Imports NPM
import { IsNotEmpty } from 'class-validator';
// #endregion
// #region Imports Local
// #endregion

// #region User
export class UserDTO {
  id: string;

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
  password?: string;
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
}
// #endregion
