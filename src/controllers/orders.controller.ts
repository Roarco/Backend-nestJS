import { Controller, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return {
      message: 'Orders',
    };
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return {
      message: `Order ${id}`,
    };
  }
}
