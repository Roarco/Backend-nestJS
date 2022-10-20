import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Brand ${id} updated`,
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
