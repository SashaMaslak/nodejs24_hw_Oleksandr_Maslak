import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseAbstractionModule } from '../database-abstraction/database-abstraction.module';
import { DBType } from '../database-abstraction/types/enums/database-type.enum';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, DatabaseAbstractionModule.register(DBType.MONGODB)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
