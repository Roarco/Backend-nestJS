import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'stag'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(), //postgres database name
  POSTGRES_USER: Joi.string().required(), //postgres user name
  POSTGRES_PASSWORD: Joi.string().required(), //postgres password
  POSTGRES_PORT: Joi.number().required(), //postgres port
  POSTGRES_HOST: Joi.string().required(), //postgres host
  MYSQL_DATABASE: Joi.string().required(), //mysql database name
  MYSQL_USER: Joi.string().required(), //mysql user name
  MYSQL_ROOT_PASSWORD: Joi.string().required(), //mysql password
  MYSQL_PORT: Joi.number().required(), //mysql port
  MYSQL_HOST: Joi.string().required(), //mysql host
});
