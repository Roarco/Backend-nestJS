import { Injectable, NotFoundException } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService, //private configService: ConfigService,
  ) {}

  private idCount = 1;
  private users: User[] = [
    {
      id: this.idCount,
      name: 'John Doe',
      email: 'Joan@gmail.com',
      password: 'jonsito123456789',
      role: 'admin',
    },
  ];

  /**
   * This method find all users in the database
   * @returns {User[]}
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * This method find one user in the database
   * @param id
   * @returns {User}
   */
  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /**
   * This method creates a new user in the database
   * @param user
   * @returns {User}
   */

  create(user: CreateUserDto): User {
    this.idCount = this.idCount + 1;
    const newUser = {
      id: this.idCount,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * This method updates a user in the database
   * @param id
   * @param user
   * @returns {User}
   */

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

  /**
   * This method deletes a user in the database
   * @param id
   * @returns {boolean}
   */

  delete(id: number): boolean {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  /**
   * It finds a user by id, then returns an order object with the user, a date, and a list of products
   * @param {number} id - number - The id of the user we want to find
   * @returns An object with a date, user, and products.
   */
  async findOrdersByUser(id: number): Promise<Order> {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(50, 0),
    };
  }
}
