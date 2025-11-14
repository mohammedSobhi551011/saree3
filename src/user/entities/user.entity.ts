import { Column, Entity, OneToMany } from "typeorm";
import { Address } from "./address.entity";
import { Order } from "src/order/entities/order.entity";
import { BaseUser } from "src/common/entities/base-user.entity";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
@Entity("users")
export class User extends BaseUser {
  @Column({ type: "enum", enum: UserRole, enumName: "role" })
  role: UserRole;
  @Column({ type: "decimal", default: 0 })
  balance: number;
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
  @OneToMany(() => Order, (order) => order.orderedBy)
  orders: Order[];
}
