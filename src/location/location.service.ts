import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Government } from './entities/government.entity';
import { City } from './entities/city.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateGovernmentDto, UpdateGovernmentDto } from './dto/government.dto';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Government)
    private governmentRepo: Repository<Government>,
    @InjectRepository(City) private cityRepo: Repository<City>,
  ) {}

  createGovernment(createGovernmentDto: CreateGovernmentDto) {
    const { name } = createGovernmentDto;
    const government = this.governmentRepo.create({ name });
    return this.governmentRepo.save(government);
  }

  findAllGovernments(options?: FindManyOptions<Government>) {
    return this.governmentRepo.find(options);
  }

  findOneGovernementBy(options: FindOneOptions<Government>) {
    return this.governmentRepo.findOne(options);
  }

  async findOneExistingGovernment(options: FindOneOptions<Government>) {
    const government = await this.findOneGovernementBy(options);
    if (!government) {
      throw new NotFoundException('Government not found');
    }
    return government;
  }

  async updateGovernment(id: number, updateGovernmentDto: UpdateGovernmentDto) {
    const government = await this.findOneExistingGovernment({ where: { id } });
    government.name = updateGovernmentDto.name || government.name;
    return this.governmentRepo.save(government);
  }

  async removeGovernment(id: number) {
    const government = await this.findOneExistingGovernment({ where: { id } });
    return this.governmentRepo.remove(government);
  }

  async createCity(createCityDto: CreateCityDto) {
    const { name, governmentId } = createCityDto;
    const government = await this.findOneExistingGovernment({
      where: { id: governmentId },
    });
    const city = this.cityRepo.create({ name, government });
    return this.cityRepo.save(city);
  }

  findAllCities(options?: FindManyOptions<City>) {
    return this.cityRepo.find(options);
  }

  findOneCityBy(options: FindOneOptions<City>) {
    return this.cityRepo.findOne(options);
  }

  async findOneExistingCity(options: FindOneOptions<City>) {
    const city = await this.findOneCityBy(options);
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOneExistingCity({ where: { id } });
    city.name = updateCityDto.name || city.name;
    if (updateCityDto.governmentId) {
      const government = await this.findOneExistingGovernment({
        where: { id: updateCityDto.governmentId },
      });
      city.government = government;
    }
    return this.cityRepo.save(city);
  }

  async removeCity(id: number) {
    const city = await this.findOneExistingCity({ where: { id } });
    return this.cityRepo.remove(city);
  }
}
