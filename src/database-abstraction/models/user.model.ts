import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@SchemaDecorator({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  isStudent: boolean;

  @Prop()
  refreshToken?: string;

  @Prop()
  accessToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = mongoose.model('User', UserSchema);
