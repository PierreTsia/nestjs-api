import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, DeleteUserDto, UpdateUsersDto } from './dto/users.dto';
import { notFoundMessage, QueryBy } from './users.helpers';

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
    const user = await this.userModel
      .findById(userId)
      .select(omittedField)
      .exec();
    if (!user) {
      throw new NotFoundException(notFoundMessage(QueryBy.Id, userId));
    }
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(notFoundMessage(QueryBy.Email, email));
    }
    return user;
  }

  async findByHandle(handle: string): Promise<User> {
    const user = await this.userModel
      .findOne({ handle })
      .select(omittedField)
      .exec();
    if (!user) {
      throw new NotFoundException(notFoundMessage(QueryBy.Handle, handle));
    }
    return user;
  }

  async update(updateUserDto: UpdateUsersDto, requestUserId): Promise<User> {
    const { userId, ...fields } = updateUserDto;

    if (requestUserId !== userId) {
      throw new UnauthorizedException();
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { ...fields },
        { new: true, useFindAndModify: false },
      )
      .select(omittedField)
      .exec();

    if (!updatedUser) {
      throw new NotFoundException();
    }
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
    if (!deletedUser) {
      throw new NotFoundException(
        notFoundMessage(QueryBy.Id, deleteUserDto.userId),
      );
    }
    return deletedUser;
  }
}
