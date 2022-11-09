import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
//import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';
import { CostumesService } from './costumes.service';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService, //private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private customerService: CostumesService,
  ) {}

  /**
   * It returns a promise of an array of users, and it uses the usersRepository to find all users, and
   * it also returns the customer relation
   * @returns An array of users with their customer relations
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['customer'],
    });
  }

  /**
   * It finds a user by id and returns it
   * @param {string} id - string - The id of the user we want to find.
   * @returns The user object
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * We're creating a new user, but first we're checking if the user already exists. If the user
   * exists, we throw an error. If the user doesn't exist, we create a new user and save it to the
   * database
   * @param {CreateUserDto} user - CreateUserDto - This is the object that will be passed to the
   * method.
   * @returns The user that was created.
   */
  async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (userExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const newUser = this.usersRepository.create(user);
    const costumer = await this.customerService.findOne(user.customerId);

    if (!costumer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    newUser.customer = costumer;
    return await this.usersRepository.save(newUser);
  }

  /**
   * We're updating a user by id, and we're passing in the user object that we want to update
   * @param {string} id - string - The id of the user to update
   * @param {UpdateUserDto} user - UpdateUserDto
   * @returns The updated user
   */
  async update(id: string, user: UpdateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.customerId) {
      const customer = await this.customerService.findOne(user.customerId);
      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }
      userExists.customer = customer;
    }
    await this.usersRepository.merge(userExists, user);
    return await this.usersRepository.save(userExists);
  }

  /*
  async findOrdersByUser(id: number): Promise<Order> {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(50, 0),
    };
  } */

  /**
   * It finds a user by id, throws an error if the user is not found, and deletes the user if it is
   * found
   * @param {string} id - The id of the user to be deleted.
   * @returns The user object
   */
  async delete(id: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.usersRepository.delete(id);
  }
}
