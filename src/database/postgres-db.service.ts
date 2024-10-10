import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresDbService {
  constructor(private readonly dataSource: DataSource) {}

  async connect(): Promise<void> {
    console.log('Connected to PostgresSql');
  }

  async disconnect(): Promise<void> {
    console.log('Disconnected from PostgresSql');
  }

  async insertOne(entity: any): Promise<void> {
    await this.dataSource.manager.save(entity);
  }

  async findOne<T>(entityClass: { new (): T }, id: number): Promise<T | null> {
    return this.dataSource.manager.findOne(entityClass, {
      where: { id } as any,
    });
  }
}
