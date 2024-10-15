import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './mongo-db.service';
import { AbstractDbService } from './abstract-db.service';
import {
  User,
  UserSchema,
  UserDocument,
} from 'src/api/users/schemas/user.schema';
import { Model } from 'mongoose';

@Module({})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        {
          provide: AbstractDbService,
          useFactory: async (
            configService: ConfigService,
            userModel: Model<UserDocument>,
          ) => {
            const dbType = configService.get<string>('DB_TYPE');
            if (dbType === 'mongo') {
              return new MongoDbService(userModel);
            } else {
              throw new Error('Непідтримуваний тип бази даних.');
            }
          },
          inject: [ConfigService, 'UserModel'],
        },
        MongoDbService,
      ],
      exports: [AbstractDbService, MongooseModule],
    };
  }
}

// TypeOrmModule.forRootAsync({
//   useFactory: (configService: ConfigService) => {
//     const dbType = configService.get<string>('DB_TYPE');
//     if (dbType === 'postgres') {
//       return {
//         type: 'postgres',
//         host: configService.get<string>('POSTGRES_HOST'),
//         port: +configService.get<number>('POSTGRES_PORT'),
//         username: configService.get<string>('POSTGRES_USER'),
//         password: configService.get<string>('POSTGRES_PASSWORD'),
//         database: configService.get<string>('POSTGRES_DB'),
//         entities: [],
//         synchronize: true,
//       };
//     }
//     return null;
//   },
//   inject: [ConfigService],
// }),
