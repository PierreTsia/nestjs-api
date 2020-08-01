import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './auth.model';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne(email);
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<Token> {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
