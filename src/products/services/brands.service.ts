import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException(`Brand not found`, HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  /**
   * It creates a new brand if it doesn't already exist
   * @param {CreateBrandDto} brand - CreateBrandDto - this is the data that will be passed to the
   * function.
   * @returns The brand that was created.
   */
  async create(brand: CreateBrandDto): Promise<Brand> {
    const brandExists = await this.brandRepository.findOne({
      where: { name: brand.name },
    });

    if (brandExists) {
      throw new HttpException(
        `Brand ${brand.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const newBrand = this.brandRepository.create(brand);
    return await this.brandRepository.save(newBrand);
  }

  /**
   * We're updating a brand by id, and returning the updated brand
   * @param {string} id - The id of the brand to update
   * @param {UpdateBrandDto} brand - UpdateBrandDto - This is the data that we will be updating the
   * brand with.
   * @returns The updated brand
   */
  async update(id: string, brand: UpdateBrandDto): Promise<Brand> {
    const brandExists = await this.brandRepository.findOne({ where: { id } });

    if (!brandExists) {
      throw new HttpException(`Brand not found`, HttpStatus.NOT_FOUND);
    }

    await this.brandRepository.update(id, brand);
    return await this.brandRepository.findOne({ where: { id } });
  }

  /**
   * It deletes a brand by id
   * @param {string} id - string - The id of the brand to be deleted.
   * @returns The brand that was deleted.
   */
  async delete(id: string): Promise<any> {
    const brandExists = await this.brandRepository.findOne({ where: { id } });

    if (!brandExists) {
      throw new HttpException(`Brand not found`, HttpStatus.NOT_FOUND);
    }
    return await this.brandRepository.delete(id);
  }
}
