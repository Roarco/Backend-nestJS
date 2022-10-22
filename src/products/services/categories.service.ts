import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
@Injectable()
export class CategoriesService {
  private idCount = 1;

  private categories: Category[] = [
    {
      id: this.idCount,
      name: 'Bebidas',
      description: 'Bebidas',
      image:
        'https://www.coca-cola.es/content/dam/journey/es/es/private/2018/01/31/1517415600000-coca-cola-1-5l.png',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

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
  }
}