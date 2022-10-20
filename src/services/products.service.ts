import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  private idCount = 1;
  private products: Product[] = [
    {
      id: this.idCount,
      name: 'Coca Cola',
      description: 'Coca Cola 1.5L',
      price: 1.5,
      stock: 10,
      image:
        'https://www.coca-cola.es/content/dam/journey/es/es/private/2018/01/31/1517415600000-coca-cola-1-5l.png',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(product: Product): Product {
    this.idCount = this.idCount + 1;
    const newProduct = {
      id: this.idCount,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Product): Product {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...product,
    };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
