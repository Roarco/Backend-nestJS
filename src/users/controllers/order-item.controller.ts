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

import { OrderItemService } from '../services/order-item.service';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@ApiTags('OrderItems')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all order items' })
  getAll(): Promise<OrderItem[]> {
    return this.orderItemService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get order item by id' })
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<OrderItem> {
    return this.orderItemService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create order item' })
  create(@Body() orderItem: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.create(orderItem);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order item' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() orderItem: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.update(id, orderItem);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete order item' })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.orderItemService.remove(id);
  }
}
