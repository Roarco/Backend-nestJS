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
  ParseUUIDPipe,
  //ParseIntPipe, // <-- pipe de nestjs
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

//import { ParseIntPipe } from '../../common/parse-int.pipe'; // <-- pipe custom
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
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Product[]> {
    return this.productsService.findAll(limit, offset);
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }

  @ApiOperation({ summary: 'Update a product' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.productsService.delete(id);
  }

  @ApiOperation({ summary: 'Delete Category from Product' })
  @Delete(':id/category/:categoryId')
  @HttpCode(HttpStatus.OK)
  deleteCategoryFromProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Product> {
    return this.productsService.removeCategoryFromProduct(id, categoryId);
  }

  @ApiOperation({ summary: 'Add Category to Product' })
  @Post(':id/category/:categoryId')
  @HttpCode(HttpStatus.CREATED)
  addCategoryToProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Product> {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }
}
