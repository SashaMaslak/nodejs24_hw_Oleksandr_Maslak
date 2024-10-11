import { Injectable, Logger } from '@nestjs/common';
import { AbstractDatabaseService } from '../database-abstract.service';
import mongoose, { Mongoose } from 'mongoose';
import { UserModel } from '../models/user.model';
import { ConfigService } from '@nestjs/config';
import { MongooseModelsMapEnum } from '../types/enums/mngodb-model-map.enum';

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
    this.logger.log('Distonnected from MongoDB');
  }

  async insertOne(table: MongooseModelsMapEnum, data: any): Promise<void> {
    const model = this.getModel(table);
    const insertEntity = new model(data);
    await insertEntity.save();
  }

  async findOne(table: MongooseModelsMapEnum, query: any): Promise<any> {
    const model = this.getModel(table);
    return model.findOne(query).lean();
  }

  private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;

      default:
        break;
    }
  }
}
