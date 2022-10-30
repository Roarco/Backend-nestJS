import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configuration from '../config/configuration';
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
      useFactory: (config: ConfigType<typeof configuration>) => {
        const { user, host, db, password, port } = config.postgres;
        const client = new Client({
          user,
          host,
          database: db,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [configuration.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'], // Para que se pueda usar en otros modulos
})
export class DatabaseModule {}
