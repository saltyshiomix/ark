import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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
