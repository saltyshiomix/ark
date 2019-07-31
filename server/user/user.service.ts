/** @format */

// #region Imports NPM
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// #endregion
// #region Imports Local
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { ConfigService } from '../config/config.service';
// #endregion

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async showAll(page: number = 1): Promise<any> {
    const users = await this.userRepository.find({
      relations: ['ideas', 'bookmarks'],
      take: 25,
      skip: 25 * (page - 1),
    });

    return users.map((user) =>
      user.toResponseObject(false, this.configService),
    );
  }

  async read(id: number): Promise<any> {
    const user = (await this.userRepository.findOne({
      where: { id },
    })) as UserEntity;

    return user.toResponseObject(false, this.configService);
  }

  async login(data: UserDTO): Promise<any> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject(true, this.configService);
  }

  async register(data: UserDTO): Promise<any> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    return user.toResponseObject(true, this.configService);
  }
}
