import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.service.create(createUserDto);
  }

  @Get()
  public async findAll(@Query() query): Promise<User[]> {
    const users: User[] = await this.service.findAll();
    users.map(user => delete user.password);
    return users;
  }

  @Get(':id')
  public async findOne(@Param('id') id): Promise<User> {
    const user: User = await this.service.findOne(id);
    delete user.password;
    return user;
  }

  @Put(':id')
  public async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id): Promise<void> {
    await this.service.delete(id);
  }
}
