import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AbstractDatabaseService } from '../database-abstract.service';
import mongoose, { Mongoose } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { ConfigService } from '@nestjs/config';
import { MongooseModelsMapEnum } from '../types/enums/mngodb-model-map.enum';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PartialUpdateUserDto } from 'src/users/dto/partial-update-user.dto';

@Injectable()
export class MongoDatabaseService extends AbstractDatabaseService {
  private readonly logger = new Logger(MongoDatabaseService.name);

  private client: Mongoose;
  private mongoUri: string;

  constructor(configService: ConfigService) {
    super();

    this.mongoUri = configService.get<string>('mongodb.MONGO_URI');
  }

  async connect(): Promise<void> {
    this.client = await mongoose.connect(this.mongoUri);
    this.logger.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    await this.client.connection.close();
    this.logger.log('Disconnected from MongoDB');
  }

  async insertOne(table: MongooseModelsMapEnum, data: any): Promise<User> {
    const model = this.getModel(table);
    const insertEntity = new model(data);
    await insertEntity.save();
    this.logger.log(`Inserted User: ${insertEntity}`);
    return insertEntity;
  }

  async findAll(table: string, skip?: number, take?: number): Promise<any[]> {
    const model = this.getModel(MongooseModelsMapEnum.USER);

    const users = await model
      .find()
      .skip(skip || 0)
      .limit(take || 20)
      .lean();

    console.log(users);

    return users;
  }

  async count(table: MongooseModelsMapEnum): Promise<number> {
    const model = this.getModel(table);
    return model.countDocuments().exec();
  }

  async findOne(table: MongooseModelsMapEnum, query: any): Promise<any> {
    const model = this.getModel(table);
    return model.findOne(query).lean();
  }

  async remove(table: MongooseModelsMapEnum, id: string): Promise<any> {
    const model = this.getModel(table);
    const user = await model.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await model.deleteOne({ _id: id });
    return user;
  }

  async findById(table: MongooseModelsMapEnum, id: string): Promise<any> {
    const model = this.getModel(table);
    const user = await model.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(
    table: MongooseModelsMapEnum,
    email: string,
  ): Promise<any | null> {
    const model = this.getModel(table);
    return await model.findOne({ email }).exec();
  }

  async findByIdAndReplace(
    table: MongooseModelsMapEnum,
    id: string,
    dto: UpdateUserDto,
  ): Promise<any> {
    const model = this.getModel(table);
    const existingUser = await model.findById(id).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return updatedUser;
  }

  async findByIdAndUpdate(
    table: MongooseModelsMapEnum,
    id: string,
    dto: PartialUpdateUserDto,
  ): Promise<any> {
    const model = this.getModel(table);

    const existingUser = await model.findById(id).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    return updatedUser;
  }

  private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;

      default:
        throw new Error('Model not found for this table');
    }
  }
}
