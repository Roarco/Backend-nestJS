import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    CategoriesController,
    OrdersController,
    BrandsController,
  ],
  providers: [ProductsService, OrdersService, CategoriesService, BrandsService],
})
export class ProductsModule {}
