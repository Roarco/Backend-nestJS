import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
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
