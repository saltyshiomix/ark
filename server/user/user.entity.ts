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
import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// #endregion
// #region Imports Local
import { ConfigService } from '../config/config.service';
import { UserResponseDTO } from './models/user.dto';
// import { JwtPayload } from '../auth/models/jwt-payload.interface';
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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string | undefined): Promise<boolean> {
    return bcrypt.compare(attempt || '', this.password);
  }

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
    };
  }
}
