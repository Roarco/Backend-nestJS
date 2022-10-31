import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @ApiOperation({ summary: 'Get brand by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a brand' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(brand);
  }

  @ApiOperation({ summary: 'Update a brand' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() brand: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, brand);
  }

  @ApiOperation({ summary: 'Delete a brand' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.brandsService.delete(id);
  }
}
