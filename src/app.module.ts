import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { DbModule } from './database/abstract.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './api/users/schemas/user.schema';
import { LogIpMiddleware } from './middleware/log-ip.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware).forRoutes('*');
  }
}
