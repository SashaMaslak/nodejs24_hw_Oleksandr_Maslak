import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({})
export class AbstractDbModule {
  static register(options: {
    uri: string;
    type: 'mongodb' | 'postgresql';
  }): DynamicModule {
    const imports = [];

    if (options.type === 'mongodb') {
      imports.push(
        MongooseModule.forRoot(options.uri, {
          connectionFactory: (connection) => {
            console.log('MongoDB connected successfully');
            return connection;
          },
        }),
      );
    } else if (options.type === 'postgresql') {
      imports.push(
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: options.uri,
          synchronize: true,
          autoLoadEntities: true,
        }),
      );
    }

    return {
      module: AbstractDbModule,
      imports,
      exports: imports,
    };
  }
}
