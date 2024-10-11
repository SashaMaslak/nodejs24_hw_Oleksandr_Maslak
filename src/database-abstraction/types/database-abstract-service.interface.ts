export interface IAbstractDatabaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne(table: string, data: any): Promise<void>;
  findOne(table: string, query: any): Promise<any>;
}
