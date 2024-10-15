import { Injectable, Inject } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    return this.pool.query(queryText, values).then((result: QueryResult) => {
      return result.rows;
    });
  }
}
