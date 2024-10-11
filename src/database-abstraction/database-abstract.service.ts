import { IAbstractDatabaseService } from './types/database-abstract-service.interface';

export abstract class AbstractDatabaseService
  implements IAbstractDatabaseService
{
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne(table: string, data: any): Promise<void>;
  abstract findOne(table: string, query: any): Promise<any>;
}
