import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    host: configService.get<string>('postgres.POSTGRES_HOST'),
    port: configService.get<number>('postgres.POSTGRES_PORT'),
    user: configService.get<string>('postgres.POSTGRES_USER'),
    password: configService.get<string>('postgres.POSTGRES_PASSWORD'),
    database: configService.get<string>('postgres.POSTGRES_DB'),
  });
};
