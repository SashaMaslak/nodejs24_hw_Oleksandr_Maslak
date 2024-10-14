import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, model, Model } from 'mongoose';
import mongoose from 'mongoose';

@SchemaDecorator({ timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true })
  id: string;

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

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = mongoose.model('User', UserSchema);

UserSchema.pre<UserDocument>('save', function () {
  this.id = this._id.toString();
});
