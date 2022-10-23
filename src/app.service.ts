import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    //@Inject('TASKS') private tasks: any[],
    readonly http: HttpService,
  ) {}
  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    return `Hello World! apiKey: ${apiKey} dbName: ${dbName}`;
  }

  async getTasks() {
    const tasks = await this.http.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    const data = await (await firstValueFrom(tasks)).data;
    return data;
  }
}
