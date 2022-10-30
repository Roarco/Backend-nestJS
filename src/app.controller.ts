import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.appService.getTasks(limit, offset);
  }
}
