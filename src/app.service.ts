import { Injectable, Inject } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    //@Inject('TASKS') private tasks: any[],
    readonly http: HttpService,
  ) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }

  async getTasks() {
    const tasks = await this.http.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    const data = await (await firstValueFrom(tasks)).data;
    return data;
  }
}
