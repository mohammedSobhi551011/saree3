import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Government } from "./entities/government.entity";
import { City } from "./entities/city.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateCityDto } from "./dto/city/create-city.dto";
import { CreateGovernmentDto } from "./dto/government/create-government.dto";
import { UpdateGovernmentDto } from "./dto/government/update-government.dto";
import { UpdateCityDto } from "./dto/city/update-city.dto";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Government)
    private governmentRepo: Repository<Government>,
    @InjectRepository(City) private cityRepo: Repository<City>
  ) {}

  createGovernment(createGovernmentDto: CreateGovernmentDto) {
    const { name } = createGovernmentDto;
    const government = this.governmentRepo.create({ name });
    return this.governmentRepo.save(government);
  }

  findAllGovernments(options?: FindManyOptions<Government>) {
    return this.governmentRepo.find(options);
  }

  findOneGovernement(options: FindOneOptions<Government>) {
    return this.governmentRepo.findOne(options);
  }

  async findExistingOneGovernment(options: FindOneOptions<Government>) {
    const government = await this.findOneGovernement(options);
    if (!government) {
      throw new NotFoundException("Government is not found");
    }
    return government;
  }

  async updateGovernment(id: number, updateGovernmentDto: UpdateGovernmentDto) {
    const government = await this.findExistingOneGovernment({ where: { id } });
    government.name = updateGovernmentDto.name || government.name;
    await this.governmentRepo.save(government);
    return;
  }

  async removeGovernment(id: number) {
    const government = await this.findExistingOneGovernment({ where: { id } });
    return this.governmentRepo.remove(government);
  }

  async createCity(createCityDto: CreateCityDto) {
    const { name, governmentId } = createCityDto;
    const government = await this.findExistingOneGovernment({
      where: { id: governmentId },
    });
    const city = this.cityRepo.create({ name, government });
    return this.cityRepo.save(city);
  }

  findAllCities(options?: FindManyOptions<City>) {
    return this.cityRepo.find(options);
  }

  findOneCity(options: FindOneOptions<City>) {
    return this.cityRepo.findOne(options);
  }

  async findExistingOneCity(options: FindOneOptions<City>) {
    const city = await this.findOneCity(options);
    if (!city) {
      throw new NotFoundException("City is not found");
    }
    return city;
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findExistingOneCity({ where: { id } });
    city.name = updateCityDto.name || city.name;
    if (updateCityDto.governmentId) {
      const government = await this.findExistingOneGovernment({
        where: { id: updateCityDto.governmentId },
      });
      city.government = government;
    }
    return this.cityRepo.save(city);
  }

  async removeCity(id: number) {
    const city = await this.findExistingOneCity({ where: { id } });
    return this.cityRepo.remove(city);
  }
}
