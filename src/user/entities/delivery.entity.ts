import { PasswordBase } from "src/common/entities/password-base.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("deliveries")
export class Delivery extends PasswordBase{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column("text")
    fullname: string;
    @Column("text")
    email:string;
    @Column("decimal")
    balance:number

    @OneToMany(()=>Order,order=>order.deliveredBy)
    orders: Order[]
}