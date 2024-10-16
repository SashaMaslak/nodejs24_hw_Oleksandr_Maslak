import { User } from './models/user.model';
import { IAbstractDatabaseService } from './types/database-abstract-service.interface';

export abstract class AbstractDatabaseService
  implements IAbstractDatabaseService
{
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne(table: string, data: any): Promise<User>;
  abstract findOne(table: string, query: any): Promise<any>;
  abstract findAll(
    table: string,
    skip?: number,
    take?: number,
  ): Promise<User[]>;
  abstract remove(table: string, id: string): Promise<any>;
  abstract findById(table: string, id: string): Promise<any>;
  abstract findByEmail(table: string, email: string): Promise<any | null>;
  abstract findByIdAndReplace(
    table: string,
    id: string,
    dto: any,
  ): Promise<any>;
  abstract findByIdAndUpdate(table: string, id: string, dto: any): Promise<any>;
  abstract count(table: string): Promise<number>;
}
