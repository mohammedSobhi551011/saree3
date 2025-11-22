import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Government } from "./government.entity";
import { Market } from "src/market/entities/market.entity";
import { Address } from "src/address/entities/address.entity";

@Entity("cities")
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  name: string;

  @ManyToOne(() => Government, (government) => government.cities, {
    onDelete: "CASCADE",
  })
  government: Government;

  @OneToMany(() => Market, (market) => market.city)
  markets: Market[];
  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}
