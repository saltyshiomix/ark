/** @format */

// #region Imports NPM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  // OneToMany,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// #endregion
// #region Imports Local
import { ConfigService } from '../config/config.service';
import {
  UserResponseDTO,
  LoginService,
  LoginIdentificator,
} from './models/user.dto';
// #endregion

@Entity('user')
export class UserEntity {
  configService: ConfigService;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  middleName: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @Column({
    type: 'json',
    nullable: true,
  })
  addressPersonal: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAdmin: boolean;

  @Column('text')
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  loginService: LoginService;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  loginIdentificator: LoginIdentificator;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  comparePassword = async (attempt: string | undefined): Promise<boolean> =>
    bcrypt.compare(attempt || '', this.password);

  toResponseObject(
    configService: ConfigService,
    token: string,
  ): UserResponseDTO {
    if (!this.configService) {
      this.configService = configService;
    }

    const {
      id,
      createdAt,
      updatedAt,
      username,
      firstName,
      lastName,
      middleName,
      birthday,
      addressPersonal,
      isAdmin,
      loginService,
      loginIdentificator,
    } = this;

    return {
      id,
      createdAt,
      updatedAt,
      username,
      firstName,
      lastName,
      middleName,
      birthday,
      addressPersonal,
      isAdmin,
      token,
      loginService,
      loginIdentificator,
    };
  }
}
