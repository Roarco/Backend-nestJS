import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll() {
    return {
      message: 'Orders',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `Order ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Order created',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Order ${id} updated`,
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
