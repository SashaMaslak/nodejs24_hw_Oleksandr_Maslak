import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
