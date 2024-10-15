import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IAbstractDatabaseService } from '../database-abstraction/types/database-abstract-service.interface';
import { MongooseModelsMapEnum } from 'src/database-abstraction/types/enums/mngodb-model-map.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database-abstraction/models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('DATABASE_CONNECTION') private dbService: IAbstractDatabaseService,
  ) {}

  async findOne(id: string): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.dbService.findById(MongooseModelsMapEnum.USER, id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<void> {
    this.logger.log('Creating user.');
    await this.dbService.insertOne(MongooseModelsMapEnum.USER, dto);
    this.logger.log('User created successfully.');
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users.');
    const users = await this.dbService.findAll(MongooseModelsMapEnum.USER);
    this.logger.log(`Fetched ${users.length} users.`);
    return users;
  }

  async remove(id: string): Promise<User> {
    this.logger.log(`Removing user with ID: ${id}`);
    const user = await this.dbService.remove(MongooseModelsMapEnum.USER, id);
    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Fetching user with email: ${email}`);
    return await this.dbService.findByEmail(MongooseModelsMapEnum.USER, email);
  }

  async findByIdAndReplace(id: string, dto: UpdateUserDto): Promise<User> {
    this.logger.log(`Replacing user with ID: ${id}`);

    const updatedUser = await this.dbService.findByIdAndReplace(
      MongooseModelsMapEnum.USER,
      id,
      dto,
    );

    return updatedUser;
  }

  async findByIdAndUpdate(
    id: string,
    dto: PartialUpdateUserDto,
  ): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    const updatedUser = await this.dbService.findByIdAndUpdate(
      MongooseModelsMapEnum.USER,
      id,
      dto,
    );
    return updatedUser;
  }
}
