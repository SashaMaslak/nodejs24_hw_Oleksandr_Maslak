import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { NODE_ENV } from 'src/config/constants';

export class DbProvider {
  private nodeEnv: string;
  private postgresHost: string;
  private host: string;

  constructor(private readonly configService: ConfigService) {
    this.nodeEnv = this.configService.get<string>('application.NODE_ENV');
    this.postgresHost = this.configService.get<string>(
      'postgres.POSTGRES_HOST',
    );

    this.host =
      this.nodeEnv === NODE_ENV.Local ? 'localhost' : this.postgresHost;
  }

  createDbProvider() {
    return {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        host: this.configService.get<string>('postgres.POSTGRES_HOST'),
        port: this.configService.get<number>('postgres.POSTGRES_PORT'),
        user: this.configService.get<string>('postgres.POSTGRES_USER'),
        password: this.configService.get<string>('postgres.POSTGRES_PASSWORD'),
        database: this.configService.get<string>('postgres.POSTGRES_DB'),
      }),
    };
  }
}
