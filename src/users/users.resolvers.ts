import { Args, Query, Resolver,  Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-authguard.guard';
import { CurrentUser } from './current-user';
import {
  CreateUserDto,
  UpdateUsersDto,
  GqlUser,
  DeleteUserDto,
} from './dto/users.dto';

@Resolver(of => GqlUser)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => GqlUser)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: { userId: string; email: string }) {
    return this.usersService.findById(user.userId);
  }

  @Query(returns => [GqlUser])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.usersService.findAll();
  }

  @Query(returns => GqlUser)
  @UseGuards(GqlAuthGuard)
  async userByHandle(@Args('handle', { type: () => String }) handle: string) {
    return this.usersService.findByHandle(handle);
  }

  @Query(returns => GqlUser)
  @UseGuards(GqlAuthGuard)
  async userById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(returns => GqlUser)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(returns => GqlUser)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: { userId: string; email: string },
    @Args('updateUserInput') updateUserInput: UpdateUsersDto,
  ) {
    return this.usersService.update(updateUserInput, user.userId);
  }

  @Mutation(returns => GqlUser)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @CurrentUser() user: { userId: string; email: string },
    @Args('deleteUserInput') deleteUserInput: DeleteUserDto,
  ) {
    return this.usersService.delete(deleteUserInput, user.userId);
  }
}
