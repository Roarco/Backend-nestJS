import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { CostumersController } from './controllers/costumers.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsController } from './controllers/brands.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, OrdersController, CostumersController, UsersController, BrandsController],
  providers: [AppService],
})
export class AppModule {}
