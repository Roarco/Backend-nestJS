import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return {
      message: `Category ${categoryId} and Product ${productId}`,
    };
  }

  @Get()
  getAll() {
    return {
      message: 'Categories',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `Category ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Category created',
      payload,
    };
  }
}
