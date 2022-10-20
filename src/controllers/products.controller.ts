import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Product {
    return this.productsService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Product {
    return this.productsService.create(product);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() product: Product): object {
    const response = this.productsService.update(+id, product);
    if (response) {
      return response;
    }
    return {
      message: 'Product not found',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string): object {
    const response = this.productsService.delete(+id);

    if (response) {
      return {
        message: 'Product deleted',
      };
    }
    return {
      message: 'Product not found',
    };
  }
}
