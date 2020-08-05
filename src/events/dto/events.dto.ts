import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsOptional,
  Length,
} from 'class-validator';
import { GqlUser } from '../../users/dto/users.dto';

@ObjectType()
export class EventLocation {
  @Field()
  @IsLatitude()
  lat: number;

  @Field()
  @IsLongitude()
  lon: number;
}

@ObjectType()
export class GqlEvent {
  @Field(type => ID)
  id: string;

  @Field(type => GqlUser)
  creator: GqlUser;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field()
  createdDate: string;

  @Field()
  public: boolean;

  @Field()
  active: boolean;

  @Field()
  @IsLatLong()
  location: string;

  @Field(type => [GqlUser])
  attendants: GqlUser[];
}

@InputType()
export class CreateEventDto {
  @Field(type => ID)
  creator: GqlUser;

  @Field()
  @Length(5, 30)
  title: string;

  @Field()
  @Length(5, 200)
  description: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field()
  @IsBoolean()
  public: boolean;

  @Field()
  @IsLatLong()
  location: string;
}

@InputType()
export class EventDatesInput {
  @Field()
  @IsDateString()
  fromDate: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsDateString()
  toDate?: string;
}

@InputType()
export class UpdateEventDto {
  @Field(returns => ID)
  eventId: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 200)
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  public: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsLatLong()
  location: string;
}
