import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  /*   
  create(category: CreateCategoryDto): Category {
    this.idCount = this.idCount + 1;
    const newCategory = {
      id: this.idCount,
      ...category,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

 
  update(id: number, category: UpdateCategoryDto): Category {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories[index] = {
      ...this.categories[index],
      ...category,
    };
    return this.categories[index];
  }


  delete(id: number): boolean {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  } */
}
