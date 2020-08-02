import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
  IsLowercase,
  Length,
  Matches,
} from 'class-validator';
import { passwordFormat, handleFormat } from '../users.helpers';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(passwordFormat.rule, { message: passwordFormat.message })
  password: string;

  @Matches(handleFormat.rule, { message: handleFormat.message })
  handle: string;

  @IsNotEmpty()
  @Length(3, 25)
  username: string;
}

export class UpdateUsersDto {
  @IsMongoId()
  userId: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @Matches(handleFormat.rule, { message: handleFormat.message })
  @Length(3, 25)
  handle: string;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 25)
  username: string;
}
