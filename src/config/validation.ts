import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'stag'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
});
