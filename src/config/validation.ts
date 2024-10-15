import * as Joi from 'joi';
import { NODE_ENV } from './constants';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NODE_ENV))
    .required(),
  PORT: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  THROTTLE_TTL: Joi.number().required(),

  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
});
