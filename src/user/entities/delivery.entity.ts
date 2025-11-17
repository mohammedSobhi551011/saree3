import { BaseUser } from "src/common/entities/base-user.entity";
import { DeliveryRole } from "src/common/types";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("deliveries")
export class Delivery extends BaseUser {
  @Column({
    type: "enum",
    enum: DeliveryRole,
    enumName: "role",
    default: DeliveryRole.DELIVERY,
  })
  role: DeliveryRole;
  @OneToMany(() => Order, (order) => order.deliveredBy)
  orders: Order[];
}
