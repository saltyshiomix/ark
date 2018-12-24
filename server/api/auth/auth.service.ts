import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  public async validateUserByEmail(email: string): Promise<User> {
    return await this.service.findOneByEmail(email);
  }

  public async registerUserIfNotExist(registerUserDto: RegisterUserDto): Promise<User> {
    const user: User = await this.validateUserByEmail(registerUserDto.email);
    if (user) {
      return user;
    }
    return await this.service.create(registerUserDto as CreateUserDto);
  }
}
