import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

const API_key = '54564654';
const API_key_PROD = 'Prod54564654';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_key_PROD : API_key,
    },
  ],
})
export class AppModule {}
