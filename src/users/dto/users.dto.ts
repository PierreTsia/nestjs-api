import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  NotContains,
} from 'class-validator';
import { passwordFormat, handleFormat } from '../users.helpers';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GqlUser {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  handle: string;

  @Field()
  avatar: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Matches(passwordFormat.rule, { message: passwordFormat.message })
  password: string;

  @Field()
  @NotContains(' ', { message: 'No whitespaces allowed in handle field' })
  @Matches(handleFormat.rule, { message: handleFormat.message })
  handle: string;

  @Field()
  @IsNotEmpty()
  @Length(3, 25)
  username: string;
}

@InputType()
export class UpdateUsersDto {
  @IsMongoId()
  @Field(type => ID)
  userId: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @Matches(handleFormat.rule, { message: handleFormat.message })
  @NotContains(' ', { message: 'No whitespaces allowed in handle field' })
  @Length(3, 25)
  @Field({ nullable: true })
  handle?: string;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 25)
  @Field({ nullable: true })
  username?: string;
}

@InputType()
export class DeleteUserDto {
  @IsMongoId()
  @Field(type => ID)
  userId: string;
}
