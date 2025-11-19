import { BaseUser } from "src/common/entities/base-user.entity";
import { Market } from "src/market/entities/market.entity";
import { Column, Entity, OneToOne } from "typeorm";

export enum MerchantRole {
  MERCHANT = "merchant",
}

@Entity("merchants")
export class Merchant extends BaseUser {
  @Column({
    type: "enum",
    enum: MerchantRole,
    enumName: "role",
    default: MerchantRole.MERCHANT,
  })
  role: MerchantRole;
  @OneToOne(() => Market, (market) => market.owner, {
    onDelete: "SET NULL",
  })
  market: Market | null;

  @Column({ type: "uuid", nullable: true })
  marketId: string | null;
}
