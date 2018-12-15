import { Injectable } from '@nestjs/common';
import { User } from '../../entities/users/user.entity';
import { UsersService } from '../../entities/users/users.service';
import { CreateUserDto } from '../../entities/users/dto/create-user.dto';
import { CreateUserIfNotExistDto } from './dto/create-user-if-not-exist.dto';

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  public async validateUser(email: string): Promise<User> {
    return await this.service.findOneByEmail(email);
  }

  public async createUserIfNotExist(createUserIfNotExistDto: CreateUserIfNotExistDto): Promise<User> {
    const user: User = await this.validateUser(createUserIfNotExistDto.email);
    if (user) {
      return user;
    }
    return await this.service.create(createUserIfNotExistDto as CreateUserDto);
  }
}
