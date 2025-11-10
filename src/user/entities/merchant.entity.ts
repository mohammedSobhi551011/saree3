import { PasswordBase } from "src/common/entities/password-base.entity";
import { Market } from "src/market/entities/market.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("merchants")
export class Merchant extends PasswordBase{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column("text")
    fullname: string;
    @Column("text")
    email:string;
    @Column("decimal")
    balance:number

    @OneToOne(()=>Market,market=>market.owner,{onDelete:"SET NULL"})
    market:Market | null
}