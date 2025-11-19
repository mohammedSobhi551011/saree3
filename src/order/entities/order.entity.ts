import { MarketItem } from "src/market/entities/market-item.entity";
import { Delivery } from "src/delivery/entities/delivery.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

enum OrderStatus {
  ORDERED = "ordered",
  PICKEDUP = "picked_up",
  ONTHEWAY = "on_the_way",
  DELIVERED = "delivered",
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enumName: "status", enum: OrderStatus })
  status: OrderStatus;
  @CreateDateColumn()
  orderedAt: Date;
  @Column("text")
  address: string;
  @Column("decimal")
  totalPrice: number;
  @Column("decimal")
  merchanShare: number;
  @Column("decimal")
  deliveryFee: number;
  @Column("boolean")
  moneyRecieved: boolean;

  @OneToMany(() => User, (user) => user.orders)
  orderedBy: User;
  @OneToMany(() => Delivery, (delivery) => delivery.orders)
  deliveredBy: Delivery;

  @ManyToMany(() => MarketItem, (item) => item.orders)
  @JoinTable()
  items: MarketItem[];
}
