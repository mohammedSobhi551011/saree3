import { City } from "src/location/entities/city.entity";
import { Merchant } from "src/merchant/entities/merchant.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MarketItem } from "./market-item.entity";

@Entity("markets")
export class Market {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  name: string;
  @Column("text")
  address: string;

  @ManyToOne(() => City, (city) => city.markets, { onDelete: "CASCADE" })
  city: City;

  @OneToOne(() => Merchant, (owner) => owner.market)
  @JoinColumn({ name: "owner_id", referencedColumnName: "id" })
  owner: Merchant;

  @OneToMany(() => MarketItem, (item) => item.market)
  items: MarketItem[];
}
