import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Merchant, MerchantRole } from "./entities/merchant.entity";
import { FindManyOptions, FindOneOptions, Not, Repository } from "typeorm";
import { UpdateMerchantDto } from "./dto/update-merchant.dto";
import { CreateMerchantDto } from "./dto/create-merchant.dto";

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepo: Repository<Merchant>
  ) {}
  async create(createMerchantDto: CreateMerchantDto) {
    const { email, firstName, lastName, middleName, password, username } =
      createMerchantDto;
    const usernameExists = await this.merchantRepo.exists({
      where: { username },
    });
    if (usernameExists)
      throw new NotAcceptableException("Username is already exists");

    const emailExists = await this.merchantRepo.exists({
      where: { email },
    });
    if (emailExists)
      throw new NotAcceptableException("Email is already exists");

    const merchant = this.merchantRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
      role: MerchantRole.MERCHANT,
    });
    return this.merchantRepo.save(merchant);
  }

  findAll(options?: FindManyOptions<Merchant>) {
    return this.merchantRepo.find(options);
  }

  findOne(options: FindOneOptions<Merchant>) {
    return this.merchantRepo.findOne(options);
  }

  async findExistingOne(options: FindOneOptions<Merchant>) {
    const merchant = await this.findOne(options);
    if (!merchant) throw new NotFoundException("Merchant is not found.");
    return merchant;
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto) {
    const { email, firstName, lastName, middleName, username } =
      updateMerchantDto;
    const merchant = await this.findExistingOne({ where: { id } });
    if (username && username !== merchant.username) {
      const usernameExists = await this.merchantRepo.exists({
        where: { username, id: Not(id) },
      });
      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
      merchant.username = username;
    }
    if (email && email !== merchant.email) {
      const emailExists = await this.merchantRepo.exists({
        where: { email, id: Not(id) },
      });
      if (emailExists)
        throw new NotFoundException(
          "Email already exists. Please choose another one."
        );
      merchant.email = email;
    }
    if (firstName) merchant.firstName = firstName;
    if (lastName) merchant.lastName = lastName;
    if (middleName) merchant.middleName = middleName;
    return this.merchantRepo.save(merchant);
  }

  async toggleActivation(id: string, isActive: boolean) {
    const merchant = await this.findExistingOne({ where: { id } });
    merchant.isActive = isActive;
    return this.merchantRepo.save(merchant);
  }

  async remove(id: string) {
    const merchant = await this.findExistingOne({ where: { id } });
    return this.merchantRepo.remove(merchant);
  }
}
