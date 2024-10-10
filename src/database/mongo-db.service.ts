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
    // Логіка підключення (необов'язкова)
  }

  async disconnect(): Promise<void> {
    // Логіка відключення (необов'язкова)
  }

  async insertOne(data: User): Promise<void> {
    await this.userModel.create(data); // Збереження нового користувача
  }

  async findOne(query: any): Promise<UserDocument | null> {
    return this.userModel.findOne(query).exec(); // Пошук користувача
  }
}
