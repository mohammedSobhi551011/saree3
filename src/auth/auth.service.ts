import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "src/common/types";
import { CreateDeliveryDto } from "src/user/dto/delivery.dto";
import { CreateMerchantDto } from "src/user/dto/merchant.dto.";
import { CreateUserDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // User Methods
  async userLogin(username: string, password: string) {
    const user = await this.userService.findOneUser({
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
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }

  async userSignup(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }

  // Merchant Methods
  async merchantLogin(username: string, password: string) {
    const user = await this.userService.findOneMerchant({
      where: { username },
      select: { id: true, username: true, email: true, password: true },
    });
    if (!user || (await user.comparePassword(password)) === false) {
      throw new BadRequestException("Invalid credentials");
    }
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }
  async merchantSignup(createMerchantDto: CreateMerchantDto) {
    const user = await this.userService.createMerchant(createMerchantDto);
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }

  // Delivery Methods
  async deliveryLogin(username: string, password: string) {
    const user = await this.userService.findOneDelivery({
      where: { username },
      select: { id: true, username: true, email: true, password: true },
    });
    if (!user || (await user.comparePassword(password)) === false) {
      throw new BadRequestException("Invalid credentials");
    }
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }

  async deliverySignup(createDeliveryDto: CreateDeliveryDto) {
    const user = await this.userService.createDelivery(createDeliveryDto);
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      }),
    };
  }
}
