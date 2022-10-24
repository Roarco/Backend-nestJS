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
  //ParseIntPipe, // <-- pipe de nestjs
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe'; // <-- pipe custom
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query('limit') limit = 5, @Query('offset') offset = 0): Product[] {
    return this.productsService.findAll(limit, offset);
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: CreateProductDto): Product {
    return this.productsService.create(product);
  }

  @ApiOperation({ summary: 'Update a product' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, product);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    return this.productsService.delete(id);
  }
}
