import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/users.dto';

type AuthPayload = { user: User; access_token: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findOne(email);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<AuthPayload> {
    const payload = { email: user.email, sub: user.id };
    return { user, access_token: this.jwtService.sign(payload) };
  }

  async signUp(createUserDto: CreateUserDto): Promise<AuthPayload> {
    const newUser = await this.userService.create(createUserDto);
    return await this.login(newUser);
  }
}
