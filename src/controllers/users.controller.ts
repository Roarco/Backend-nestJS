import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return {
      message: 'Users',
    };
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return {
      message: `User ${id}`,
    };
  }
}
