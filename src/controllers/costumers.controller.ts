import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('costumers')
export class CostumersController {
  @Get()
  getAll() {
    return {
      message: 'Costumers',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `Costumer ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Costumer created',
      payload,
    };
  }
}
