import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAll() {
    return {
      message: 'Users',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `User ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'User created',
      payload,
    };
  }
}
