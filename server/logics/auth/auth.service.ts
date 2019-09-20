import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  public async registerUserIfNotExist(name: string, email: string, password: string): Promise<any> {
    let user: User | undefined = await this.userService.findOneByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    user = await this.userService.save(await this.userService.create({
      name,
      email,
      password,
    }));

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async validateUser(email: string, password: string): Promise<any> {
    const user: User | undefined = await this.userService.findOneByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
