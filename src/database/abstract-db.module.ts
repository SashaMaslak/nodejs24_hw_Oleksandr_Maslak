import { Module, DynamicModule, Global, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({})
export class AbstractDbModule {
  static register(uri: string): DynamicModule {
    return {
      module: AbstractDbModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot(uri, {
          connectionFactory: (connection) => {
            const logger = new Logger('MongoDB');
            logger.log('MongoDB connected successfully');
            return connection;
          },
        }),
      ],
      exports: [MongooseModule],
    };
  }
}
