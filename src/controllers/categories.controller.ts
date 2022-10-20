import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Category ${id} updated`,
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
