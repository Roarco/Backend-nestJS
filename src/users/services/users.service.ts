import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService, //private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * It returns a promise that resolves to an array of users
   * @returns An array of users
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /**
   * It finds a user by id, and if it doesn't find one, it throws a NotFoundException
   * @param {string} id - string - The id of the user we want to find.
   * @returns A user object
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /* create(user: CreateUserDto): User {
    this.idCount = this.idCount + 1;
    const newUser = {
      id: this.idCount,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }


  update(id: number, user: UpdateUserDto): User {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users[index] = {
      ...this.users[index],
      ...user,
    };
    return this.users[index];
  }


  delete(id: number): boolean {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }


  async findOrdersByUser(id: number): Promise<Order> {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(50, 0),
    };
  } */
}
