import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  /**
   * It returns a list of products, with a limit of how many products to return, and an offset of how
   * many products to skip
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
   * It finds a product by its id and returns it
   * @param {string} id - string - The id of the product we want to find.
   * @returns The product with the given id.
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  /**
   * We're creating a new product, but first we're checking if the product already exists. If it does,
   * we throw an error. If it doesn't, we create a new product, find the brand, find the categories, and save the product
   * @param {CreateProductDto} product - CreateProductDto - This is the product object that we are
   * creating.
   * @returns The product that was created.
   */
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
    const brand = await this.brandRepository.findOne(product.brandId);
    const categories = await this.categoriesRepository.findByIds(
      product.categoryIds,
    );

    if (!brand) {
      throw new HttpException(`Brand not found`, HttpStatus.NOT_FOUND);
    }

    if (categories.length !== product.categoryIds.length) {
      throw new HttpException(
        `Some categories were not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    newProduct.brand = brand;
    newProduct.categories = categories;
    return await this.productRepository.save(newProduct);
  }

  /**
   * We first check if the product exists, if it does, we check if the brandId is passed in the request
   * body, if it is, we check if the brand exists, if it does, we set the brand of the product to the
   * brand we found and categories, then we merge the productExists with the product, and finally we save the product
   * @param {string} id - The id of the product to be updated.
   * @param {UpdateProductDto} product - UpdateProductDto - This is the DTO that we created earlier.
   * @returns The updated product
   */
  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const productExists = await this.productRepository.findOne({
      where: { id },
    });

    if (!productExists) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    if (product.brandId) {
      const brand = await this.brandRepository.findOne(product.brandId);
      if (!brand) {
        throw new HttpException(`Brand not found`, HttpStatus.NOT_FOUND);
      }
      productExists.brand = brand;
    }

    if (product.categoryIds) {
      const categories = await this.categoriesRepository.findByIds(
        product.categoryIds,
      );
      if (categories.length !== product.categoryIds.length) {
        throw new HttpException(
          `Some categories were not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      productExists.categories = categories;
    }

    this.productRepository.merge(productExists, product);
    return await this.productRepository.save(productExists);
  }

  /**
   * It deletes a product from the database
   * @param {string} id - string - The id of the product to be deleted.
   * @returns The product that was deleted.
   */
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
