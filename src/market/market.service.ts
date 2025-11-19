import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMarketDto, UpdateMarketDto } from "./dto/market.dto";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Market } from "./entities/market.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { LocationService } from "src/location/location.service";
import { MerchantService } from "src/merchant/merchant.service";

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market) protected readonly marketRepo: Repository<Market>,
    protected readonly merchantService: MerchantService,
    protected readonly locationService: LocationService
  ) {}
  async create(createMarketDto: CreateMarketDto) {
    const { address, cityId, name, ownerId } = createMarketDto;
    const newMarket = this.marketRepo.create({ name, address });
    const city = await this.locationService.findExistingOneCity({
      where: { id: cityId },
    });
    const owner = await this.merchantService.findExistingOne({
      where: { id: ownerId },
    });
    newMarket.city = city;
    newMarket.owner = owner;
    const savedOne = await this.marketRepo.save(newMarket);
    return savedOne;
  }

  findAll(options?: FindManyOptions<Market>) {
    return this.marketRepo.find(options);
  }

  findOne(options: FindOneOptions<Market>) {
    return this.marketRepo.findOne(options);
  }

  async findExistingOne(options: FindOneOptions<Market>) {
    const market = await this.findOne(options);
    if (!market) throw new NotFoundException("Market is not found.");
    return market;
  }

  async update(id: number, updateMarketDto: UpdateMarketDto) {
    const { address, cityId, name, ownerId } = updateMarketDto;
    const existingMarket = await this.findExistingOne({ where: { id } });
    if (address) existingMarket.address = address;
    if (name) existingMarket.name = name;
    if (cityId) {
      const city = await this.locationService.findExistingOneCity({
        where: { id: cityId },
      });
      existingMarket.city = city;
    }
    if (ownerId) {
      const owner = await this.merchantService.findExistingOne({
        where: { id: ownerId },
      });
      existingMarket.owner = owner;
    }
    return this.marketRepo.save(existingMarket);
  }

  async remove(id: number) {
    const existingMarket = await this.findExistingOne({ where: { id } });
    return this.marketRepo.remove(existingMarket);
  }
}
