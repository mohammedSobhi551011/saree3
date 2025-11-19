import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Delivery, DeliveryRole } from "./entities/delivery.entity";
import { FindManyOptions, FindOneOptions, Not, Repository } from "typeorm";
import { CreateDeliveryDto, UpdateDeliveryDto } from "./dto/delivery.dto";

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>
  ) {}
  async create(createDeliveryDto: CreateDeliveryDto) {
    const { email, firstName, lastName, middleName, password, username } =
      createDeliveryDto;
    const isExist = await this.deliveryRepo.exists({
      where: [{ username }, { email }],
    });
    if (isExist)
      throw new NotAcceptableException("Username or email is already exists");
    const delivery = this.deliveryRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
      role: DeliveryRole.DELIVERY,
    });
    return this.deliveryRepo.save(delivery);
  }
  findAll(options?: FindManyOptions<Delivery>) {
    return this.deliveryRepo.find(options);
  }
  findOne(options: FindOneOptions<Delivery>) {
    return this.deliveryRepo.findOne(options);
  }
  async findExistingOne(options: FindOneOptions<Delivery>) {
    const delivery = await this.findOne(options);
    if (!delivery) throw new NotFoundException("Delivery is not found.");
    return delivery;
  }
  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const { email, firstName, lastName, middleName, username } =
      updateDeliveryDto;
    const delivery = await this.findExistingOne({ where: { id } });
    if (username && username !== delivery.username) {
      const usernameExists = await this.deliveryRepo.exists({
        where: { username, id: Not(id) },
      });
      const emailExists = await this.deliveryRepo.exists({
        where: { email, id: Not(id) },
      });

      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
      if (emailExists)
        throw new NotFoundException(
          "Email already exists. Please choose another one."
        );
      delivery.username = username;
    }
    if (email && email !== delivery.email) {
      const emailExists = await this.deliveryRepo.exists({
        where: { email, id: Not(id) },
      });
      if (emailExists)
        throw new NotFoundException(
          "Email already exists. Please choose another one."
        );
      delivery.email = email;
    }
    if (firstName) delivery.firstName = firstName;
    if (lastName) delivery.lastName = lastName;
    if (middleName) delivery.middleName = middleName;
    return this.deliveryRepo.save(delivery);
  }
  async toggleActivation(id: string, isActive: boolean) {
    const delivery = await this.findExistingOne({ where: { id } });
    delivery.isActive = isActive;
    return this.deliveryRepo.save(delivery);
  }
  async remove(id: string) {
    const delivery = await this.findExistingOne({ where: { id } });
    return this.deliveryRepo.remove(delivery);
  }
}
