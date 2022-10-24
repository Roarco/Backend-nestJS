import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

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

  /**
   * This method find all products in the database
   * @returns {Product[]}
   */
  findAll(limit: number, offset: number): Product[] {
    return this.products.slice(offset, offset + limit);
  }

  /**
   * This method find one product in the database
   * @param  {number} id - The id of the product
   * @returns {Product}
   */
  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  /**
   * This method creates a new product in the database
   * @param {CreateProductDto} product - The product to create
   * @returns {Product}
   */
  create(product: CreateProductDto): Product {
    this.idCount = this.idCount + 1;
    const newProduct = {
      id: this.idCount,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * This method updates a product in the database
   * @param {number} id - The id of the product
   * @param {UpdateProductDto} product - The product to update
   * @returns {Product}
   */
  update(id: number, product: UpdateProductDto): Product {
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

  /**
   * This method removes a product in the database
   * @param {number} id - The id of the product
   */
  delete(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
