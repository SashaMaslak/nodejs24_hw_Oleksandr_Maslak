import { NODE_ENV } from './constants';

export const configuration = () => ({
  application: {
    NODE_ENV: process.env.NODE_ENV || NODE_ENV.Development,
    port: parseInt(process.env.PORT, 10) || 3000,
    throttlerTTL: process.env.THROTTLE_TTL,
    throttlerLimit: process.env.THROTTLE_LIMIT,
  },
  postgres: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
  },
  mongodb: {
    MONGO_URI: process.env.MONGO_URI,
  },
});
