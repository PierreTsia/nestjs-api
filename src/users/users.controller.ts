import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  allUsers(): User[] {
    return this.userService.findAll();
  }

}
