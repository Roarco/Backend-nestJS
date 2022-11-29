import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  role: string;

  @ApiProperty()
  @OneToOne(() => Customer, (customer) => customer.user)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
