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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CostumesService } from '../services/costumes.service';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@ApiTags('Customers')
@Controller('costumers')
export class CostumersController {
  constructor(private costumersService: CostumesService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Customer[]> {
    return this.costumersService.findAll();
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    return this.costumersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Customes: CreateCustomerDto): Promise<Customer> {
    return this.costumersService.create(Customes);
  }

  @ApiOperation({ summary: 'Update a customer' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() customes: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.costumersService.update(id, customes);
  }

  @ApiOperation({ summary: 'Delete a customer' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.costumersService.delete(id);
  }
}
