import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  /**
   * It returns a promise that resolves to an array of products
   * @param {number} limit - number - The number of products to return
   * @param {number} offset - The number of records to skip.
   * @returns An array of products
   */
  async findAll(limit: number, offset: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });
    return products;
  }

  /**
   * It finds a product by its ID and throws an error if it doesn't exist
   * @param {string} id - string - The id of the product we want to find.
   * @returns A product
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
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
  /* create(product: CreateProductDto): Product {
    this.idCount = this.idCount + 1;
    const newProduct = {
      id: this.idCount,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  } */

  /**
   * This method updates a product in the database
   * @param {number} id - The id of the product
   * @param {UpdateProductDto} product - The product to update
   * @returns {Product}
   */
  /* update(id: number, product: UpdateProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...product,
    };
    return this.products[index];
  } */

  /**
   * This method removes a product in the database
   * @param {number} id - The id of the product
   */
  /* delete(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  } */
}
