import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUsersDto, CreateUserDto, DeleteUserDto } from './dto/users.dto';

const omittedField = '-password -__v';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await new this.userModel(createUserDto).save();
    return await this.findById(createdUser.id);
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
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }

  async findByHandle(handle: string): Promise<User> {
    const user = this.userModel
      .findOne({ handle })
      .select(omittedField)
      .exec();
    return user;
  }

  async update(updateUserDto: UpdateUsersDto, requestUserId): Promise<User> {
    const { userId, ...fields } = updateUserDto;
    if (requestUserId !== userId) {
      throw new UnauthorizedException();
    }

    const updatedUser = this.userModel
      .findByIdAndUpdate(
        userId,
        { ...fields },
        { new: true, useFindAndModify: false },
      )
      .select(omittedField)
      .exec();
    return updatedUser;
  }

  async delete(deleteUserDto: DeleteUserDto, requestUserId): Promise<User> {
    if (requestUserId !== deleteUserDto.userId) {
      throw new UnauthorizedException();
    }
    const deletedUser = await this.userModel
      .findByIdAndRemove(deleteUserDto.userId)
      .select(omittedField)
      .exec();
    return deletedUser;
  }
}
