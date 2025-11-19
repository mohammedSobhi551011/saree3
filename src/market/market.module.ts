import { Module } from "@nestjs/common";
import { MarketService } from "./market.service";
import { MarketController } from "./market.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Market } from "./entities/market.entity";
import { MarketItem } from "./entities/market-item.entity";
import { LocationModule } from "src/location/location.module";
import { MerchantModule } from "src/merchant/merchant.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Market, MarketItem]),
    MerchantModule,
    LocationModule,
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
