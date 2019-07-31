/** @format */

// #region Imports NPM
import { IsNotEmpty } from 'class-validator';
// #endregion
// #region Imports Local
// eslint-disable-next-line import/no-cycle
// import { IdeaEntity } from '../idea/idea.entity';
// #endregion

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password?: string;
}

export class UserRO extends UserDTO {
  id?: string;

  // username: string;

  firstName: string;

  lastName: string;

  middleName: string;

  birthday: string;

  addressPersonal: string;

  isAdmin: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  token?: string;
}
