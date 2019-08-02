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
} from './models/user.dto';
import { ConfigService } from '../config/config.service';
// eslint-disable-next-line import/no-cycle
import { AuthService } from '../auth/auth.service';
// #endregion

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async read(id: string): Promise<UserResponseDTO | null> {
    const user = (await this.userRepository.findOne({
      where: { id },
    })) as UserEntity;

    if (!user) {
      return null;
    }

    const token = this.authService.token({ id: user.id });
    return user.toResponseObject(this.configService, token);
  }

  async login({
    username,
    password,
  }: UserLoginDTO): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = this.authService.token({ id: user.id });
    return user.toResponseObject(this.configService, token);
  }

  async register(data: UserRegisterDTO): Promise<UserResponseDTO | null> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    const token = this.authService.token({ id: user.id });
    return user.toResponseObject(this.configService, token);
  }
}
