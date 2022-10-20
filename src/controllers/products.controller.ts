import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `Products: Limit ${limit} Offset ${offset}`;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }
}
