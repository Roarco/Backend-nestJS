import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create category' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(category);
  }

  @ApiOperation({ summary: 'Update category' })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, category);
  }

  @ApiOperation({ summary: 'Delete category' })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.categoriesService.delete(id);
  }
}
