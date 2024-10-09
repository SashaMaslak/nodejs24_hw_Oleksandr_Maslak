import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({})
export class AbstractDbModule {
  static register(): DynamicModule {
    return {
      module: AbstractDbModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // Динамічно підключаємо відповідний модуль бази даних
        AbstractDbModule.createDatabaseModule(),
      ],
    };
  }

  private static createDatabaseModule(): DynamicModule {
    // Використовуємо фабрику для вибору бази даних залежно від типу DB_TYPE
    return {
      module: AbstractDbModule,
      imports: [
        {
          // Динамічний вибір модуля бази даних
          ...(process.env.DB_TYPE === 'mongo'
            ? MongooseModule.forRoot(process.env.MONGO_URI, {
                connectionFactory: (connection) => {
                  console.log('MongoDB connected successfully');
                  return connection;
                },
              })
            : TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.POSTGRES_URI,
                synchronize: true, // Автоматична синхронізація (лише для розробки)
                autoLoadEntities: true, // Автоматичне завантаження ентіті
              })),
        },
      ],
    };
  }
}
