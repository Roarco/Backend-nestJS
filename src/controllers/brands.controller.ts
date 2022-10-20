import { Controller, Get, Param } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return {
      message: 'Brands',
    };
  }

  @Get(':id')
  getBrand(@Param('id') id: string) {
    return {
      message: `Brand ${id}`,
    };
  }
}
