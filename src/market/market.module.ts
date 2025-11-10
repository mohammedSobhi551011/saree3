import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './entities/market.entity';
import { MarketItem } from './entities/market-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Market,MarketItem])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
