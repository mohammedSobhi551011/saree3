import { Module } from "@nestjs/common";
import { MarketService } from "./market.service";
import { MarketController } from "./market.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Market } from "./entities/market.entity";
import { MarketItem } from "./entities/market-item.entity";
import { LocationService } from "src/location/location.service";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { LocationModule } from "src/location/location.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Market, MarketItem]),
    UserModule,
    LocationModule,
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
