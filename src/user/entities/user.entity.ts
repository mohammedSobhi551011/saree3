import { Column, Entity, OneToMany } from "typeorm";
import { Address } from "./address.entity";
import { Order } from "src/order/entities/order.entity";
import { BaseUser } from "src/common/entities/base-user.entity";
import { UserRole } from "src/common/types";

@Entity("users")
export class User extends BaseUser {
  @Column({
    type: "enum",
    enum: UserRole,
    enumName: "role",
    default: UserRole.USER,
  })
  role: UserRole;
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
  @OneToMany(() => Order, (order) => order.orderedBy)
  orders: Order[];
}
