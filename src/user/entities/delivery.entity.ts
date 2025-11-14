import { BaseUser } from "src/common/entities/base-user.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("deliveries")
export class Delivery extends BaseUser {
  @Column({ type: "decimal", default: 0 })
  balance: number;

  @OneToMany(() => Order, (order) => order.deliveredBy)
  orders: Order[];
}
