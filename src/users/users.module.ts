import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostumersController } from './controllers/customers.controller';
import { CostumesService } from './services/costumes.service';
import { Customer } from './entities/customer.entity';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { ProductsModule } from 'src/products/products.module';
@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Customer, User])],
  controllers: [CostumersController, UsersController],
  providers: [CostumesService, UsersService],
})
export class UsersModule {}
