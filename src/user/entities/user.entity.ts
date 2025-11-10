import { PasswordBase } from 'src/common/entities/password-base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from 'src/order/entities/order.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity("users")
export class User extends PasswordBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  firstName: string;
  @Column({ type: 'varchar', length: 255 })
  middleName: string;
  @Column({ type: 'varchar', length: 255 })
  lastName: string;
  @Column({ type: 'varchar', length: 255 })
  username: string;
  @Column({ type: 'varchar', length: 255 })
  email: string;
  @Column({ type: 'enum', enum: UserRole, enumName: 'role' })
  role: UserRole;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'decimal' })
  balance: number;

  @OneToMany(()=>Address,address=>address.user)
  addresses: Address[]
  @OneToMany(()=>Order,order=>order.orderedBy)
  orders: Order[]
}
