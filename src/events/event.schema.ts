import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';
import { IsDateString, IsLatLong, Length } from 'class-validator';
import { GqlUser } from '../users/dto/users.dto';
import { DocumentMethods } from '../helpers/types';

export const subFields = {
  creator: { path: 'creator', model: 'User' },
  attendants: { path: 'creator', model: 'User' },
};

@Schema()
export class Event extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  creator: GqlUser;

  @Length(5, 30)
  @Prop({ required: true })
  title: string;

  @Length(5, 200)
  @Prop({ required: true })
  description: string;

  @Prop()
  createdDate: string;

  @Prop()
  public: boolean;

  @Prop()
  active: boolean;

  @Prop()
  @IsLatLong()
  location: string;

  @Prop()
  @IsDateString()
  startDate: string;

  @Prop()
  @IsDateString()
  endDate: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  attendants: GqlUser[];
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.post<Event>(DocumentMethods.Save, async (event, next) => {
  await event
    .populate([subFields.creator, subFields.attendants])
    .execPopulate();
  next();
});
