import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
//import { Client } from 'pg';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import configuration from './config/configuration';
@Injectable()
export class AppService {
  constructor(
    //@Inject('PG')
    //private clientPg: Client,
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>, //@Inject('TASKS') private tasks: any[],
    readonly http: HttpService,
  ) {}
  getHello(): string {
    const apiKey = this.config.apiKey;
    const dbName = this.config.database.name;
    const dbPort = this.config.database.port;
    return `Hello World! apiKey: ${apiKey} dbName: ${dbName} dbPort: ${dbPort}`;
  }

  async getTasks(limit: number, offset: number) {
    const tasks = await this.http.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    const data = await firstValueFrom(tasks);
    return data.data.slice(offset, limit);
  }

  /*  async getTasks(limit: number, offset: number): Promise<any> {
    const query = 'SELECT * FROM tasks LIMIT $1 OFFSET $2';
    const res = await this.clientPg.query(query, [limit, offset]);
    return res.rows;
  } */
}
