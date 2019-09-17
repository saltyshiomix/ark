import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let { name, email, password } = createUserDto;
    password = await hash(password, 8);
    return this.repository.create({ name, email, password });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
