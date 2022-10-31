import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const productExists = await this.productRepository.findOne({
      where: { name: product.name },
    });

    if (productExists) {
      throw new HttpException(
        `Product ${product.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const productExists = await this.productRepository.findOne({
      where: { id },
    });

    if (!productExists) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update(id, product);
    return await this.productRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<any> {
    const productExists = await this.productRepository.findOne({
      where: { id },
    });

    if (!productExists) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.delete(id);
  }
}
