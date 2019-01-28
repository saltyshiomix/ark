import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.service.create(createUserDto);
    return await this.service.save(user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id): Promise<User> {
    return await this.service.findOne(id);
  }

  @Put(':id')
  public async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    const user: User = await this.service.findOne(id);
    const { name } = updateUserDto;
    user.name = name;
    await this.service.save(user);
  }

  @Delete(':id')
  public async delete(@Param('id') id): Promise<void> {
    await this.service.delete(id);
  }
}
