import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { CreateUserDto, UpdateUsersDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  allUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':handle')
  findByHandle(@Param() params): Promise<User> {
    return this.userService.findByHandle(params.handle);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @Body() updateUserDto: UpdateUsersDto,
    @Request() req,
  ): Promise<User> {
    return this.userService.update(updateUserDto, req.user.userId);
  }
}
