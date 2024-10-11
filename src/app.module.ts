import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { ResidentModule } from './resident/resident.module';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestTimerMiddleware } from './common/middleware/request-timer.middleware';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from '@nestjs/axios';
import { LogIpMiddleware } from './common/middleware/log-ip.middleware';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          ttl: config.get('application.throttlerTTL'),
          limit: config.get('application.throttlerLimit'),
        }) as unknown as ThrottlerModuleOptions,
    }),
    UsersModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware, RequestTimerMiddleware).forRoutes('*');
  }
}
