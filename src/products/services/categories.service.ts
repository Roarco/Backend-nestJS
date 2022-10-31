import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * It returns a promise of an array of Category objects
   * @returns An array of Category objects
   */
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * It finds a category by its id and throws an error if it doesn't exist
   * @param {string} id - string - The id of the category we want to find.
   * @returns A category object
   */
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  /**
   * It creates a new category if it doesn't already exist
   * @param {CreateCategoryDto} category - CreateCategoryDto - this is the data that will be passed to
   * the service.
   * @returns The category that was created.
   */
  async create(category: CreateCategoryDto): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { name: category.name },
    });

    if (categoryExists) {
      throw new HttpException(
        `Category ${category.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  /**
   * It updates a category by id
   * @param {string} id - The id of the category to be updated.
   * @param {UpdateCategoryDto} category - UpdateCategoryDto - This is the DTO that we created earlier.
   * @returns The updated category
   */
  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryExists) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.update(id, category);
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<any> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryExists) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.delete(id);
  }
}
