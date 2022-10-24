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
}));
