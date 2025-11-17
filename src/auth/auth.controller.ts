import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  DeliverySignInDto,
  LoginDto,
  MerchantSignInDto,
  UserSignInDto,
} from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Endpoints
  @Post("/login/user")
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/user")
  async userSignup(@Body() signInDto: UserSignInDto) {
    return this.authService.userSignup(signInDto);
  }

  // Merchant Endpoints
  @Post("/login/merchant")
  async merchantLogin(@Body() loginDto: LoginDto) {
    return this.authService.merchantLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/merchant")
  async merchantSignup(@Body() signInDto: MerchantSignInDto) {
    return this.authService.merchantSignup(signInDto);
  }

  // Delivery Endpoints
  @Post("/login/delivery")
  async DeliveryLogin(@Body() loginDto: LoginDto) {
    return this.authService.deliveryLogin(loginDto.username, loginDto.password);
  }
  @Post("/signup/delivery")
  async DeliverySignup(@Body() deliverySignInDto: DeliverySignInDto) {
    return this.authService.deliverySignup(deliverySignInDto);
  }
}
