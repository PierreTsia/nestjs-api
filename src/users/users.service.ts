import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  users: User[] = [];
  constructor() {
    this.users = [
      {
        username: 'userone',
        email: 'user1@mail.com',
        password: '1234',
        id: '1',
      },
      {
        username: 'usertwo',
        email: 'user2@mail.com',
        password: '1234',
        id: '2',
      },
    ];
  }
  findAll(): User[] {
    return this.users;
  }

  findOne(email: string): User {
    return this.users.find(user => user.email === email);
  }
}
