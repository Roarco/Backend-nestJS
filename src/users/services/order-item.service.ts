import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  /**
   * It returns a promise of an array of OrderItem objects
   * @returns An array of OrderItem objects
   */
  async getAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  /**
   * Find an order item by its ID, and if it doesn't exist, throw an error
   * @param {string} id - string - The id of the order item we want to find.
   * @returns The orderItem object
   */
  async getOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne(id, {
      relations: ['order', 'product'],
    });

    if (!orderItem) {
      throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
    }

    return orderItem;
  }

  /**
   * We're creating a new order item, setting its order and product, and saving it to the database
   * @param {CreateOrderItemDto} orderItem - CreateOrderItemDto - This is the DTO that we created
   * earlier.
   * @returns The new order item is being returned.
   */
  async create(orderItem: CreateOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepository.findOne(orderItem.orderId);
    const product = await this.productRepository.findOne(orderItem.productId);

    if (!order || !product) {
      throw new HttpException(
        'Order or Product not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const newOrderItem = new OrderItem();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = orderItem.quantity;

    return this.orderItemRepository.save(newOrderItem);
  }

  /**
   * It finds an order item by id, checks if it exists, and if it does, it updates the order item with
   * the changes passed in
   * @param {string} id - The id of the order item to update.
   * @param {UpdateOrderItemDto} changes - UpdateOrderItemDto
   * @returns The updated orderItem
   */
  async update(id: string, changes: UpdateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne(id, {
      relations: ['order', 'product'],
    });

    if (!orderItem) {
      throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
    }

    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    if (changes.orderId) {
      const order = await this.orderRepository.findOne(changes.orderId);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepository.findOne(changes.productId);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      orderItem.product = product;
    }

    return this.orderItemRepository.save(orderItem);
  }

  /**
   * It finds an orderItem by its id, and if it exists, it deletes it
   * @param {string} id - The id of the orderItem to be deleted.
   * @returns The orderItem object
   */
  async remove(id: string): Promise<any> {
    const orderItem = await this.orderItemRepository.findOne(id);

    if (!orderItem) {
      throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
    }
    return this.orderItemRepository.delete(id);
  }
}
