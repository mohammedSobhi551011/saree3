import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Market } from "./market.entity";
import { Order } from "src/order/entities/order.entity";

@Entity("market_items")
export class MarketItem{
    @PrimaryGeneratedColumn()
    id: number
    @Column("text")
    name:string;
    @Column("decimal")
    price:number

    @ManyToOne(()=>Market,market=>market.items,{onDelete:"CASCADE"})
    market: Market

    @ManyToMany(()=>Order,order=>order.items)
    orders: Order[]
}