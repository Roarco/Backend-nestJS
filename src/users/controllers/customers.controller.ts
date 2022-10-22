import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { CostumesService } from '../services/costumes.service';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Controller('costumers')
export class CostumersController {
  constructor(private costumersService: CostumesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Customer[] {
    return this.costumersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.costumersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Customes: CreateCustomerDto): Customer {
    return this.costumersService.create(Customes);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() customes: UpdateCustomerDto,
  ): Customer {
    return this.costumersService.update(id, customes);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    return this.costumersService.delete(id);
  }
}
