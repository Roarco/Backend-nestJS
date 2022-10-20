import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Costumer ${id} updated`,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      id: id,
      deleted: true,
      count: 1,
    };
  }
}
