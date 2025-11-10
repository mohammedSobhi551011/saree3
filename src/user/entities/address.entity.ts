import { City } from "src/location/entities/city.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Address{
    @PrimaryGeneratedColumn()
    id:number
    @Column({type: "varchar",length:255})
    street:string;
    @Column("text")
    address1:string
    @Column("text")
    address2:string
    
    @ManyToOne(()=>City,city=>city.addresses,{onDelete:"SET NULL"})
    city:City | null

    @ManyToOne(()=>User,user=>user.addresses,{onDelete:"CASCADE"})
    user: User
}