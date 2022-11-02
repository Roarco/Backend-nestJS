/* export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  apiKey: process.env.API_KEY,
  database: {
    name: process.env.DATABASE_NAME,
  },
}); */

import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  apiKey: process.env.API_KEY,
  database: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
  },
  postgres: {
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    host: process.env.POSTGRES_HOST,
  },
  mysql: {
    db: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT, 10),
    host: process.env.MYSQL_HOST,
  },
}));
