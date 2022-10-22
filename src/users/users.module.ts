import { Module } from '@nestjs/common';
import { CostumersController } from './controllers/customers.controller';
import { CostumesService } from './services/costumes.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [],
  controllers: [CostumersController, UsersController],
  providers: [CostumesService, UsersService],
})
export class UsersModule {}
