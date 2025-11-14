import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindManyOptions, FindOneOptions, Not, Repository } from "typeorm";
import { Merchant } from "./entities/merchant.entity";
import { Delivery } from "./entities/delivery.entity";
import { CreateMerchantDto, UpdateMerchantDto } from "./dto/merchant.dto.";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateDeliveryDto, UpdateDeliveryDto } from "./dto/delivery.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>,
    @InjectRepository(Merchant)
    protected readonly merchantRepo: Repository<Merchant>,
    @InjectRepository(Delivery)
    protected readonly deliveryRepo: Repository<Delivery>
  ) {}

  // User Methods
  createUser(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAllUsers(options?: FindManyOptions<User>) {
    return this.userRepo.find(options);
  }

  findOneUser(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }

  async findExistingOneUser(options: FindOneOptions<User>) {
    const user = await this.findOneUser(options);
    if (!user) throw new NotFoundException("User is not found.");
    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }

  // Merchant Methods
  createMerchant(createMerchantDto: CreateMerchantDto) {
    const { email, firstName, lastName, middleName, password, username } =
      createMerchantDto;
    const merchant = this.merchantRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
    });
    return this.merchantRepo.save(merchant);
  }

  findAllMerchants(options?: FindManyOptions<Merchant>) {
    return this.merchantRepo.find(options);
  }

  findOneMerchant(options: FindOneOptions<Merchant>) {
    return this.merchantRepo.findOne(options);
  }

  async findExistingOneMerchant(options: FindOneOptions<Merchant>) {
    const merchant = await this.findOneMerchant(options);
    if (!merchant) throw new NotFoundException("Merchant is not found.");
    return merchant;
  }

  async updateMerchant(id: string, updateMerchantDto: UpdateMerchantDto) {
    const { email, firstName, lastName, middleName, username } =
      updateMerchantDto;
    const merchant = await this.findExistingOneMerchant({ where: { id } });
    if (username && username !== merchant.username) {
      const usernameExists = await this.merchantRepo.exists({
        where: { username, id: Not(id) },
      });
      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
    }
    if (email) merchant.email = email;
    if (firstName) merchant.firstName = firstName;
    if (lastName) merchant.lastName = lastName;
    if (middleName) merchant.middleName = middleName;
    if (username) merchant.username = username;
    return this.merchantRepo.save(merchant);
  }

  async toggleMerchantActivation(id: string, isActive: boolean) {
    const merchant = await this.findExistingOneMerchant({ where: { id } });
    merchant.isActive = isActive;
    return this.merchantRepo.save(merchant);
  }

  async removeMerchant(id: string) {
    const merchant = await this.findExistingOneMerchant({ where: { id } });
    return this.merchantRepo.remove(merchant);
  }

  // Delivery Methods
  createDelivery(createDeliveryDto: CreateDeliveryDto) {
    return "This action adds a new delivery";
  }
  findAllDeliveries(options?: FindManyOptions<Delivery>) {
    return this.deliveryRepo.find(options);
  }
  findOneDelivery(options: FindOneOptions<Delivery>) {
    return this.deliveryRepo.findOne(options);
  }
  async findExistingOneDelivery(options: FindOneOptions<Delivery>) {
    const delivery = await this.findOneDelivery(options);
    if (!delivery) throw new NotFoundException("Delivery is not found.");
    return delivery;
  }
  updateDelivery(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }
  removeDelivery(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
