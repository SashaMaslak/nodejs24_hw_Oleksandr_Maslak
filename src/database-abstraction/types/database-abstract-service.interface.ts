import { User } from '../models/user.model';

export interface IAbstractDatabaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne(table: string, data: any): Promise<User>;
  findOne(table: string, query: any): Promise<any>;
  findAll(table: any): Promise<any[]>;
  remove(table: string, id: string): Promise<any>;
  findById(table: string, id: string): Promise<any>;
  findByEmail(table: string, email: string): Promise<any | null>;
  findByIdAndReplace(table: string, id: string, dto: any): Promise<any>;
  findByIdAndUpdate(table: string, id: string, dto: any): Promise<any>;
}
