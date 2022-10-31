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

import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /* @ApiOperation({ summary: 'Get orders by user id' })
  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  getOrdersByUser(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.usersService.findOrdersByUser(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto): User {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateUserDto,
  ): User {
    return this.usersService.update(id, category);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    return this.usersService.delete(id);
  } */
}
