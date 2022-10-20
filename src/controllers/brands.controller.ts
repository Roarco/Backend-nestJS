import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getAll() {
    return {
      message: 'Brands',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `Brand ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Brand created',
      payload,
    };
  }
}
