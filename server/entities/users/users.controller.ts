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
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.service.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<User> {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<void> {
    await this.service.delete(id);
  }
}
