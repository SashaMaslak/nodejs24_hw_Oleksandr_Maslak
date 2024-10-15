import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractDatabaseService } from '../database-abstract.service';
import { PostgresEntityMapEnum } from '../types/enums/postgres-entity-map.enum';
import { UserEntity } from '../entities/user.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DBType } from '../types/enums/database-type.enum';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PartialUpdateUserDto } from 'src/users/dto/partial-update-user.dto';
import { User } from '../models/user.model';

@Injectable()
export class PostgresDatabaseService extends AbstractDatabaseService {
  private dataSource: DataSource;

  constructor(configService: ConfigService) {
    super();

    this.dataSource = new DataSource({
      type: DBType.POSTGRES,
      host: configService.get<string>('postgres.POSTGRES_HOST'),
      port: configService.get<number>('postgres.POSTGRES_PORT'),
      username: configService.get<string>('postgres.POSTGRES_USER'),
      password: configService.get<string>('postgres.POSTGRES_PASSWORD'),
      database: configService.get<string>('postgres.POSTGRES_DB'),
      entities: [UserEntity],
    });

    this.dataSource.initialize();
  }

  async connect(): Promise<void> {
    console.log('Connected to Postgres');
  }

  async disconnect(): Promise<void> {
    console.log('Distonnected from Postgres');
  }

  async insertOne(table: PostgresEntityMapEnum, data: any): Promise<User> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    const newUser = repository.create(data);
    const savedUser = await repository.save(newUser);

    return savedUser;
  }

  async findOne(table: PostgresEntityMapEnum, query: any): Promise<any> {
    console.log('Method implementation for Postgres');
  }

  async findAll(table: PostgresEntityMapEnum): Promise<any[]> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    return await repository.find();
  }

  private getEntity(table: PostgresEntityMapEnum): EntityClassOrSchema {
    switch (table) {
      case PostgresEntityMapEnum.USER:
        return UserEntity;

      default:
        break;
    }
  }

  async remove(table: PostgresEntityMapEnum, id: string): Promise<any> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    const user = await repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await repository.remove(user);

    return user;
  }

  async findById(table: PostgresEntityMapEnum, id: string): Promise<any> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    const user = await repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(table: PostgresEntityMapEnum, email: string): Promise<any> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    return await repository.findOneBy({ email });
  }

  async findByIdAndReplace(
    table: PostgresEntityMapEnum,
    id: string,
    dto: UpdateUserDto,
  ): Promise<any> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    let existingUser = await repository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await repository.update(id, dto);

    existingUser = await repository.findOneBy({ id });

    return existingUser;
  }

  async findByIdAndUpdate(
    table: PostgresEntityMapEnum,
    id: string,
    dto: PartialUpdateUserDto,
  ): Promise<any> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);

    let existingUser = await repository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await repository.update(id, dto);

    existingUser = await repository.findOneBy({ id });

    return existingUser;
  }
}
