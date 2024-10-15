import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { DatabaseAbstractionModule } from '../database-abstraction/database-abstraction.module';
import { DBType } from '../database-abstraction/types/enums/database-type.enum';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    DatabaseModule,
    DatabaseAbstractionModule.register(DBType.MONGODB),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
