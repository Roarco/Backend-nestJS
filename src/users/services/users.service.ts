import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * It creates a new user and saves it to the database
   * @param {CreateUserDto} user - CreateUserDto - This is the user object that we are creating.
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
    return await this.usersRepository.save(newUser);
  }

  /**
   * We're updating a user by id, and returning the updated user
   * @param {string} id - string - The id of the user we want to update.
   * @param {UpdateUserDto} user - UpdateUserDto - This is the DTO that we created earlier.
   * @returns The updated user
   */
  async update(id: string, user: UpdateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
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
