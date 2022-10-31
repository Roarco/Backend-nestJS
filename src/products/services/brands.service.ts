import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  /**
   * It returns a promise of an array of Brand objects
   * @returns An array of Brand objects
   */
  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  /**
   * It finds a brand by its ID and throws an error if it doesn't exist
   * @param {string} id - string - The id of the brand we want to find.
   * @returns A brand object
   */
  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  /*  create(brand: CreateBrandDto): Brand {
    this.idCount = this.idCount + 1;
    const newBrand = {
      id: this.idCount,
      ...brand,
    };
    this.brands.push(newBrand);
    return newBrand;
  } */

  /* update(id: number, brand: UpdateBrandDto): Brand {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands[index] = {
      ...this.brands[index],
      ...brand,
    };
    return this.brands[index];
  } */

  /* delete(id: number): boolean {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  } */
}
