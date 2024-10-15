import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractDbService {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne<T>(table: string, data: T): Promise<void>;
  abstract findOne<T>(table: string, query: any): Promise<T | null>;
}
