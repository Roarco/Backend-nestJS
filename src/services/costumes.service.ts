import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../interfaces/customer.interface';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
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

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: number): Customer {
    const customer = this.customers.find((c) => c.id === id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(customer: CreateCustomerDto): Customer {
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
  }
}
