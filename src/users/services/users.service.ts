import { Injectable, NotFoundException } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
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

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto): User {
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

  findOrdersByUser(id: number): Order[] {
    const user = this.findOne(id);
    const orders = [
      {
        id: 1,
        date: new Date(),
        user: user,
        products: this.productsService.findAll(10, 0),
      },
    ];
    return orders;
  }
}
