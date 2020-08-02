import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UpdateUsersDto, DeleteUserDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  allUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':handle')
  findByHandle(@Param() params): Promise<User> {
    return this.userService.findByHandle(params.handle);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param() params): Promise<User> {
    return this.userService.findById(params.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUsersDto, @Request() req): Promise<User> {
    return this.userService.update(updateUserDto, req.user.userId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Body() deleteUserDto: DeleteUserDto, @Request() req): Promise<User> {
    return this.userService.delete(deleteUserDto, req.user.userId);
  }
}
