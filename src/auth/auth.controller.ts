import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.dto";
import { CreateUserDto } from "src/user/dto/user.dto";
import { CreateMerchantDto } from "src/user/dto/merchant.dto.";
import { CreateDeliveryDto } from "src/user/dto/delivery.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Endpoints
  @Post("/login/user")
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/user")
  async userSignup(@Body() createUserDto: CreateUserDto) {
    return this.authService.userSignup(createUserDto);
  }

  // Merchant Endpoints
  @Post("/login/merchant")
  async merchantLogin(@Body() loginDto: LoginDto) {
    return this.authService.merchantLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/merchant")
  async merchantSignup(@Body() createMerchantDto: CreateMerchantDto) {
    return this.authService.merchantSignup(createMerchantDto);
  }

  // Delivery Endpoints
  @Post("/login/delivery")
  async DeliveryLogin(@Body() loginDto: LoginDto) {
    return this.authService.deliveryLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/delivery")
  async DeliverySignup(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.authService.deliverySignup(createDeliveryDto);
  }
}
