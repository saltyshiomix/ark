import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) {}

  public async validateUserByEmail(email: string): Promise<User|undefined> {
    return await this.userService.findOneByEmail(email);
  }

  public async registerUserIfNotExist(registerUserDto: RegisterUserDto): Promise<User> {
    let user: User|undefined = await this.validateUserByEmail(registerUserDto.email);
    if (user) {
      return user;
    }
    return this.userService.save(await this.userService.create(registerUserDto));
  }
}
