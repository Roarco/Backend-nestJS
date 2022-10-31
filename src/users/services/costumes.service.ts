import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
@Injectable()
export class CostumesService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   * It returns a promise of an array of customers
   * @returns An array of Customer objects
   */
  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  /**
   * It finds a customer by id and throws an error if it doesn't exist
   * @param {string} id - string - The id of the customer we want to find.
   * @returns A customer object
   */
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  /*  create(customer: CreateCustomerDto): Customer {
    this.idCount = this.idCount + 1;
    const newCustomer = {
      id: this.idCount,
      ...customer,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }


  update(id: number, customer: UpdateCustomerDto): Customer {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers[index] = {
      ...this.customers[index],
      ...customer,
    };
    return this.customers[index];
  }

  delete(id: number): boolean {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  } */
}
