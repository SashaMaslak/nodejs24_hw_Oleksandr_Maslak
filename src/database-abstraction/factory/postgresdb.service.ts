import { Injectable } from '@nestjs/common';
import { AbstractDatabaseService } from '../database-abstract.service';
import { PostgresEntityMapEnum } from '../types/enums/postgres-entity-map.enum';
import { UserEntity } from '../entities/user.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DBType } from '../types/enums/database-type.enum';

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
    });
  }

  async connect(): Promise<void> {
    console.log('Connected to Postgres');
  }

  async disconnect(): Promise<void> {
    console.log('Distonnected from Postgres');
  }

  async insertOne(table: PostgresEntityMapEnum, data: any): Promise<void> {
    console.log('Method implementation for Postgres');
  }

  async findOne(table: PostgresEntityMapEnum, query: any): Promise<any> {
    console.log('Method implementation for Postgres');
  }

  private getEntity(table: PostgresEntityMapEnum): EntityClassOrSchema {
    switch (table) {
      case PostgresEntityMapEnum.USER:
        return UserEntity;

      default:
        break;
    }
  }
}
