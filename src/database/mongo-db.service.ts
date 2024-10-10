import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/api/users/schemas/user.schema';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async connect(): Promise<void> {
    console.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    console.log('Disconnected from MongoDB');
  }

  async insertOne(data: User): Promise<User> {
    return await this.userModel.create(data);
  }

  async findOne(query: any): Promise<UserDocument | null> {
    return this.userModel.findOne(query).exec();
  }

  async updateOne(
    id: string,
    update: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
