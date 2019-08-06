/** @format */

// #region Imports NPM
import {
  Inject,
  forwardRef,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// #endregion
// #region Imports Local
import { UserEntity } from './user.entity';
import {
  UserLoginDTO,
  UserResponseDTO,
  UserRegisterDTO,
  LoginService,
  Gender,
  UserDTO,
} from './models/user.dto';
import { ConfigService } from '../config/config.service';
// eslint-disable-next-line import/no-cycle
import { AuthService } from '../auth/auth.service';
import { LdapService } from '../ldap/ldap.service';
import { AppLogger } from '../logger/logger.service';
import { LdapResponeUser } from '../ldap/interfaces/ldap.interface';

// #endregion

@Injectable()
export class UserService {
  public ldapOnUserBeforeCreate: Function;

  public ldapOnUserAfterCreate: Function;

  public ldapOnUserBeforeUpdate: Function;

  public ldapOnUserAfterUpdate: Function;

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly ldapService: LdapService,
    private readonly logger: AppLogger,
  ) {}

  /**
   * This is a call from authService.validate
   *
   * @param id - User ID
   */
  async read(id: string): Promise<UserResponseDTO | null> {
    const user = (await this.userRepository.findOne({
      where: { id },
    })) as UserEntity;

    if (!user) {
      return null;
    }

    return user.toResponseObject(
      this.configService,
      this.authService.token({ id: user.id }),
    );
  }

  /**
   * User LDAP login
   *
   * @param {string, string, UserEntity} - User register data transfer object
   * @returns {UserEntity} User response DTO
   */
  async userLdapLogin({
    username,
    password,
    user,
  }: {
    username: string;
    password: string;
    user?: UserEntity;
  }): Promise<UserEntity | undefined> {
    try {
      // #region to LDAP database
      const ldapUser: LdapResponeUser = await this.ldapService.authenticate(
        username,
        password,
      );
      // #endregion

      let comment;
      try {
        comment = JSON.parse(ldapUser.comment);
      } catch (error) {
        comment = {};
      }
      const {
        companyeng,
        nameeng,
        departmenteng,
        otdeleng,
        positioneng,
        birthday,
        gender,
      } = comment;

      const data: UserDTO = {
        username: ldapUser.sAMAccountName,
        password,
        firstName: ldapUser.givenName,
        lastName: ldapUser.sn,
        middleName: ldapUser.middleName,
        birthday,
        gender:
          gender === 'M'
            ? Gender.MAN
            : gender === 'W'
            ? Gender.WOMAN
            : Gender.UNKNOWN,
        addressPersonal: JSON.stringify({
          postalCode: ldapUser.postalCode,
          region: ldapUser.st,
          street: ldapUser.streetAddress,
        }),
        isAdmin: false,
        company: ldapUser.company,
        title: ldapUser.title,
        loginService: LoginService.LDAP,
        loginIdentificator: ldapUser.objectGUID.toString(),
        // thumbnailPhoto: ldapUser.thumbnailPhoto,
      };

      // #region User create/update
      if (!user) {
        const userLogin = await this.userRepository.create(data);
        await this.userRepository.save(userLogin);
        return userLogin;
      }

      data['id'] = user.id;
      await this.userRepository.save(data);
      // #endregion

      return user;
    } catch (error) {
      // #region If in LDAP is not found, then we compare password
      return user && (await user.comparePassword(password)) ? user : undefined;
      // #endregion
    }
  }

  /**
   * Login a user
   *
   * @param {UserLoginDTO} data User login data transfer object
   * @returns {UserResponseDTO} User response DTO
   */
  async login({
    username,
    password,
  }: UserLoginDTO): Promise<UserResponseDTO | null> {
    // eslint-disable-next-line no-debugger
    debugger;

    let user = await this.userRepository.findOne({ where: { username } });
    user = await this.userLdapLogin({ username, password, user });

    if (!user) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.FORBIDDEN,
      );
    }

    return user.toResponseObject(
      this.configService,
      this.authService.token({ id: user.id }),
    );
  }

  /**
   * Register a user
   *
   * @param {UserRegisterDTO} data User register data transfer object
   * @returns {UserResponseDTO} User response DTO
   */
  async register(data: UserRegisterDTO): Promise<UserResponseDTO | null> {
    // eslint-disable-next-line no-debugger
    debugger;

    // #region Check if a user exists
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // #endregion

    // #region Create user
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    // #endregion

    return user.toResponseObject(
      this.configService,
      this.authService.token({ id: user.id }),
    );
  }
}
