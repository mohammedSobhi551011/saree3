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
    const { email, firstName, lastName, middleName, password, username } =
      createUserDto;
    const user = this.userRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
    });
    return this.userRepo.save(user);
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { email, firstName, lastName, middleName, username } = updateUserDto;
    const user = await this.findExistingOneUser({ where: { id } });
    if (username && username !== user.username) {
      const usernameExists = await this.userRepo.exists({
        where: { username, id: Not(id) },
      });
      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
    }
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (middleName) user.middleName = middleName;
    if (username) user.username = username;
    return this.userRepo.save(user);
  }

  async toggleUserActivation(id: string, isActive: boolean) {
    const user = await this.findExistingOneUser({ where: { id } });
    user.isActive = isActive;
    return this.userRepo.save(user);
  }

  async removeUser(id: string) {
    const user = await this.findExistingOneUser({ where: { id } });
    return this.userRepo.remove(user);
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
    const { email, firstName, lastName, middleName, password, username } =
      createDeliveryDto;
    const delivery = this.deliveryRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
    });
    return this.deliveryRepo.save(delivery);
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
  async updateDelivery(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const { email, firstName, lastName, middleName, username } =
      updateDeliveryDto;
    const delivery = await this.findExistingOneDelivery({ where: { id } });
    if (username && username !== delivery.username) {
      const usernameExists = await this.deliveryRepo.exists({
        where: { username, id: Not(id) },
      });
      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
    }
    if (email) delivery.email = email;
    if (firstName) delivery.firstName = firstName;
    if (lastName) delivery.lastName = lastName;
    if (middleName) delivery.middleName = middleName;
    if (username) delivery.username = username;
    return this.deliveryRepo.save(delivery);
  }
  async toggleDeliveryActivation(id: string, isActive: boolean) {
    const delivery = await this.findExistingOneDelivery({ where: { id } });
    delivery.isActive = isActive;
    return this.deliveryRepo.save(delivery);
  }
  async removeDelivery(id: string) {
    const delivery = await this.findExistingOneDelivery({ where: { id } });
    return this.deliveryRepo.remove(delivery);
  }
}
