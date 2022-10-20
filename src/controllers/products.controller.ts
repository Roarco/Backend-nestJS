import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Products limit=${limit} offset=${offset} brand=${brand}`,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `Product ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Product created',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Product ${id} updated`,
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
