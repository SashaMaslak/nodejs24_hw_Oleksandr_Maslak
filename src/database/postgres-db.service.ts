import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions } from 'typeorm';

@Injectable()
export class PostgresDbService {
  constructor(private readonly dataSource: DataSource) {}

  async connect(): Promise<void> {
    // Логіка підключення
  }

  async disconnect(): Promise<void> {
    // Логіка відключення
  }

  async insertOne(entity: any): Promise<void> {
    await this.dataSource.manager.save(entity); // Збереження сутності
  }

  async findOne<T>(entityClass: { new (): T }, id: number): Promise<T | null> {
    return this.dataSource.manager.findOne(entityClass, {
      where: { id } as any,
    });
  }
}
