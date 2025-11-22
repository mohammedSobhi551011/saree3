import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "src/common/types";
import { DeliveryService } from "src/delivery/delivery.service";
import { CreateDeliveryDto } from "src/delivery/dto/create-delivery.dto";
import { CreateMerchantDto } from "src/merchant/dto/create-merchant.dto";
import { MerchantService } from "src/merchant/merchant.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
// import { CreateDeliveryDto } from "src/user/dto/delivery.dto";
// import { CreateMerchantDto } from "src/user/dto/merchant.dto.";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // User Methods
  async login(
    username: string,
    password: string,
    service: UserService | MerchantService | DeliveryService
  ) {
    const user = await service.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        role: true,
        email: true,
        password: true,
      },
    });
    if (!user || (await user.comparePassword(password)) === false) {
      throw new BadRequestException("Invalid credentials");
    }
    const payload: AuthPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    return this.jwtSignIn(payload);
  }

  // async signup(createDto:CreateUserDto|CreateMerchantDto|CreateDeliveryDto,service: UserService | MerchantService | DeliveryService){
  async signup(
    container:
      | { createDto: CreateUserDto; service: UserService }
      | { createDto: CreateMerchantDto; service: MerchantService }
      | { createDto: CreateDeliveryDto; service: DeliveryService }
  ) {
    const { createDto, service } = container;
    const user = await service.create(createDto);
    const payload: AuthPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtSignIn(payload);
  }
  // async userSignup(createUserDto: CreateUserDto) {
  //   const user = await this.userService.create(createUserDto);
  //   const payload: AuthPayload = {
  //     username: user.username,
  //     sub: user.id,
  //     email: user.email,
  //     role: user.role,
  //   };
  //   return this.jwtSignIn(payload);
  // }

  // // Merchant Methods
  // async merchantSignup(createMerchantDto: CreateMerchantDto) {
  //   const user = await this.userService.create(createMerchantDto);
  //   const payload: AuthPayload = {
  //     username: user.username,
  //     sub: user.id,
  //     email: user.email,
  //     role: user.role,
  //   };
  //   return this.jwtSignIn(payload);
  // }

  // // Delivery Methods
  // async deliverySignup(createDeliveryDto: CreateDeliveryDto) {
  //   const user = await this.userService.create(createDeliveryDto);
  //   const payload: AuthPayload = {
  //     username: user.username,
  //     sub: user.id,
  //     email: user.email,
  //     role: user.role,
  //   };
  //   return this.jwtSignIn(payload);
  // }

  async jwtSignIn(payload: AuthPayload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }
}
