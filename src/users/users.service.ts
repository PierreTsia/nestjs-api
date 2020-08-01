import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
const omittedField = '-password -__v';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { password, ...user } = await new this.userModel(
      createUserDto,
    ).save();
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find()
      .select(omittedField)
      .exec();
  }
  async findById(userId: string): Promise<User> {
    const user = this.userModel
      .findById(userId)
      .select(omittedField)
      .exec();
    return user;
  }
  async findOne(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    return user;
  }
}
