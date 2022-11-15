import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  /**
   * It returns a promise that resolves to an array of Order objects
   * @returns An array of Order objects
   */
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  /**
   * It finds an order by its id, and if it doesn't exist, it throws an error
   * @param {string} id - string - The id of the order we want to find.
   * @returns The order is being returned.
   */
  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  /**
   * We're creating a new order, finding the customer, and then saving the order
   * @param {CreateOrderDto} order - CreateOrderDto - this is the data that will be passed to the
   * method.
   * @returns The new order is being returned.
   */
  async create(order: CreateOrderDto): Promise<Order> {
    const newOrder = new Order();
    const customer = await this.customersRepository.findOne(order.customerId);

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    newOrder.customer = customer;

    return this.ordersRepository.save(newOrder);
  }

  /**
   * It finds an order by id, checks if it exists, checks if the customerId is provided, finds the
   * customer by id, checks if it exists, and then saves the order
   * @param {string} id - The id of the order to update.
   * @param {UpdateOrderDto} changes - UpdateOrderDto
   * @returns The order is being returned.
   */
  async update(id: string, changes: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (changes.customerId) {
      const customer = await this.customersRepository.findOne(
        changes.customerId,
      );

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      order.customer = customer;
    }

    return this.ordersRepository.save(order);
  }

  /**
   * It finds an order by its ID, throws an error if it doesn't exist, and then deletes it
   * @param {string} id - string - The id of the order to be deleted.
   * @returns The order that was removed.
   */
  async remove(id: string): Promise<any> {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return this.ordersRepository.remove(order);
  }
}
