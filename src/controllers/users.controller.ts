import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `User ${id} updated`,
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
