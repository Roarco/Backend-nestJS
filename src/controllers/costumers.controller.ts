import { Controller, Get, Param } from '@nestjs/common';

@Controller('costumers')
export class CostumersController {
  @Get()
  getCostumers() {
    return {
      message: 'Costumers',
    };
  }

  @Get(':id')
  getCostumer(@Param('id') id: string) {
    return {
      message: `Costumer ${id}`,
    };
  }
}
