import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
const API_key = '54564654';
const API_key_PROD = 'Prod54564654';

const client = new Client({
  user: 'roberth',
  host: 'localhost',
  database: 'Platzi-Store',
  password: '1104017400',
  port: 5432,
});
client.connect();
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_key_PROD : API_key,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'], // Para que se pueda usar en otros modulos
})
export class DatabaseModule {}
