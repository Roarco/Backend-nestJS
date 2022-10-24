import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
@Injectable()
export class BrandsService {
  private idCount = 1;
  private brands: Brand[] = [
    {
      id: this.idCount,
      name: 'Coca Cola',
      description:
        'Coca Cola is a brand of soft drink, manufactured and marketed by PepsiCo.',
      image:
        'https://www.coca-cola.es/content/dam/journey/es/es/private/2018/01/31/1517415600000-coca-cola-1-5l.png',
    },
  ];

  /**
   * This method find all brands in the database
   * @returns {Brand[]}
   */
  findAll(): Brand[] {
    return this.brands;
  }

  /**
   * This method find one brand in the database
   * @param id
   * @returns {Brand}
   */
  findOne(id: number): Brand {
    const brand = this.brands.find((item) => item.id === id);

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  /**
   * This method creates a new brand in the database
   * @param brand
   * @returns {Brand}
   */
  create(brand: CreateBrandDto): Brand {
    this.idCount = this.idCount + 1;
    const newBrand = {
      id: this.idCount,
      ...brand,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  /**
   * This method updates a brand in the database
   * @param id
   * @param brand
   * @returns {Brand}
   */
  update(id: number, brand: UpdateBrandDto): Brand {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands[index] = {
      ...this.brands[index],
      ...brand,
    };
    return this.brands[index];
  }

  /**
   * This method removes a brand in the database
   * @param id
   * @returns {boolean}
   */
  delete(id: number): boolean {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
