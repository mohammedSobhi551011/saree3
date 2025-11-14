import { BaseUser } from "src/common/entities/base-user.entity";
import { Market } from "src/market/entities/market.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity("merchants")
export class Merchant extends BaseUser {
  @Column({ type: "decimal", default: 0 })
  balance: number;

  @OneToOne(() => Market, (market) => market.owner, { onDelete: "SET NULL" })
  market: Market | null;
}
