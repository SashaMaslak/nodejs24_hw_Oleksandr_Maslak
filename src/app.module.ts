import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogIpMiddleware } from './middleware/log-ip.middleware';
import { AbstractDbModule } from './database/abstract-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AbstractDbModule.register(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware).forRoutes('*');
  }
}
