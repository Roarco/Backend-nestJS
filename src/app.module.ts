import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { CostumersController } from './controllers/costumers.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { CostumesService } from './services/costumes.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    CostumersController,
    UsersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, OrdersService, UsersService, CostumesService, CategoriesService, BrandsService],
})
export class AppModule {}
