import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./entities/address.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UserService } from "src/user/user.service";
import { LocationService } from "src/location/location.service";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    private readonly userService: UserService,
    private readonly locationService: LocationService
  ) {}

  async create(createAddressDto: CreateAddressDto & { userId: string }) {
    const { address1, address2, cityId, street, userId } = createAddressDto;
    const address = this.addressRepo.create({ address1, address2, street });
    const city = await this.locationService.findExistingOneCity({
      where: { id: cityId },
    });
    const user = await this.userService.findExistingOne({
      where: { id: userId },
    });
    address.user = user;
    address.city = city;
    await this.addressRepo.save(address);
    return;
  }

  findAll(options?: FindManyOptions<Address>) {
    return this.addressRepo.find(options);
  }

  findOne(options: FindOneOptions<Address>) {
    return this.addressRepo.findOne(options);
  }

  async findExistingOne(options: FindOneOptions<Address>) {
    const address = await this.findOne(options);
    if (!address) throw new NotFoundException("Address is not found.");
    return address;
  }

  async update(id: number, userId: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.findExistingOne({
      where: { id, user: { id: userId } },
    });
    const { address1, address2, cityId, street } = updateAddressDto;
    if (cityId) {
      const city = await this.locationService.findExistingOneCity({
        where: { id: cityId },
      });
      address.city = city;
    }
    return this.addressRepo.update(id, {
      ...address,
      address1,
      address2,
      street,
    });
  }

  async remove(id: number, userId: string) {
    const address = await this.findExistingOne({
      where: { id, user: { id: userId } },
    });
    return this.addressRepo.remove(address);
  }
}
