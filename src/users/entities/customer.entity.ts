import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
@Entity()
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  phone: string;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
