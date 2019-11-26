import bcrypt from 'bcrypt';
import {
  Injectable,
  Inject,
} from '@nestjs/common';
import {
  Repository,
  DeleteResult,
} from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from '../database/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  public async findOne(id: number): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    let { name, email, password } = createUserDto;
    password = await bcrypt.hash(password, 8);
    return this.repository.create({ name, email, password });
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
