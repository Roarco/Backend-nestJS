import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  /**
   * It creates a new customer and saves it to the database
   * @param {CreateCustomerDto} customer - CreateCustomerDto - This is the data that will be passed to
   * the function.
   * @returns The customer that was created.
   */
  async create(customer: CreateCustomerDto): Promise<Customer> {
    const costumeExists = await this.customerRepository.findOne({
      where: { phone: customer.phone },
    });

    if (costumeExists) {
      throw new HttpException('Phone already exists', HttpStatus.CONFLICT);
    }

    const newCustomer = this.customerRepository.create(customer);
    return await this.customerRepository.save(newCustomer);
  }

  /**
   * It updates a customer by id, and returns the updated customer
   * @param {string} id - The id of the customer to update.
   * @param {UpdateCustomerDto} customer - UpdateCustomerDto - This is the DTO that we created earlier.
   * @returns The updated customer
   */
  async update(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    const costumeExists = await this.customerRepository.findOne({
      where: { id },
    });

    if (!costumeExists) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    await this.customerRepository.update(id, customer);
    return await this.customerRepository.findOne({ where: { id } });
  }

  /**
   * It deletes a customer from the database by id
   * @param {string} id - string - The id of the customer to be deleted
   * @returns The customerRepository.delete() method is being returned.
   */
  async delete(id: string): Promise<any> {
    const costumeExists = await this.customerRepository.findOne({
      where: { id },
    });

    if (!costumeExists) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return await this.customerRepository.delete(id);
  }
}
