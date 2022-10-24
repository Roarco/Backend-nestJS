import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
@Injectable()
export class CostumesService {
  private idCount = 1;
  private customers: Customer[] = [
    {
      id: this.idCount,
      name: 'John',
      lastname: 'Doe',
      phone: '3145651757',
    },
  ];

  /**
   * This method find all customers in the database
   * @returns {Customer[]}
   */
  findAll(): Customer[] {
    return this.customers;
  }

  /**
   * This method find one customer in the database
   * @param id
   * @returns {Customer}
   */
  findOne(id: number): Customer {
    const customer = this.customers.find((c) => c.id === id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  /**
   * This method creates a new customer in the database
   * @param customer
   * @returns {Customer}
   */
  create(customer: CreateCustomerDto): Customer {
    this.idCount = this.idCount + 1;
    const newCustomer = {
      id: this.idCount,
      ...customer,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  /**
   * This method updates a customer in the database
   * @param id
   * @param customer
   * @returns {Customer}
   */
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

  /**
   * This method removes a customer in the database
   * @param id
   * @returns {boolean}
   */
  delete(id: number): boolean {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
