import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashPassword, createAvatar } from './users.helpers';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  handle: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next) {
  this.avatar = await createAvatar(`${this.handle}`);
  next();
});

UserSchema.pre<User>(
  'save',
  async function(next) {
    this.password = await hashPassword(this.password);
    next();
  },
  error => {
    throw new Error(error.message);
  },
);
