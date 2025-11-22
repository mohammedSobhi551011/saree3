import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { MarketService } from "./market.service";
import { CreateMarketDto } from "./dto/create-market.dto";
import { UpdateMarketDto } from "./dto/update-market.dto";

@Controller("market")
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.create(createMarketDto);
  }

  @Get()
  findAll() {
    return this.marketService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.marketService.findOne({ where: { id: Number(id) } });
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMarketDto: UpdateMarketDto
  ) {
    return this.marketService.update(id, updateMarketDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.marketService.remove(id);
  }
}
