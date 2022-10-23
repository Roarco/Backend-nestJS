import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import configuration from './config/configuration';
@Injectable()
export class AppService {
  constructor(
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
    //@Inject('TASKS') private tasks: any[],
    readonly http: HttpService,
  ) {}
  getHello(): string {
    const apiKey = this.config.apiKey;
    const dbName = this.config.database.name;
    const dbPort = this.config.database.port;
    return `Hello World! apiKey: ${apiKey} dbName: ${dbName} dbPort: ${dbPort}`;
  }

  async getTasks() {
    const tasks = await this.http.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    const data = await (await firstValueFrom(tasks)).data;
    return data;
  }
}
