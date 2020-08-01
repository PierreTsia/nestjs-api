import { Controller, Get, Post, Body, Param, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  allUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<User> {
    return this.userService.findById(params.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }
}
