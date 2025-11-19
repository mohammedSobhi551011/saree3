import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  DeliverySignInDto,
  LoginDto,
  MerchantSignInDto,
  UserSignInDto,
} from "./dto/auth.dto";
import { MerchantService } from "src/merchant/merchant.service";
import { DeliveryService } from "src/delivery/delivery.service";
import { UserService } from "src/user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly merchantService: MerchantService,
    private readonly deliveryService: DeliveryService
  ) {}

  // User Endpoints
  @Post("/login/user")
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.username,
      loginDto.password,
      this.userService
    );
  }
  @Post("/signup/user")
  async userSignup(@Body() signInDto: UserSignInDto) {
    return this.authService.signup({
      createDto: signInDto,
      service: this.userService,
    });
  }

  // // Merchant Endpoints
  @Post("/login/merchant")
  async merchantLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.username,
      loginDto.password,
      this.merchantService
    );
  }
  @Post("/signup/merchant")
  async merchantSignup(@Body() signInDto: MerchantSignInDto) {
    return this.authService.signup({
      createDto: signInDto,
      service: this.merchantService,
    });
  }

  // // Delivery Endpoints
  @Post("/login/delivery")
  async DeliveryLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.username,
      loginDto.password,
      this.deliveryService
    );
  }
  @Post("/signup/delivery")
  async DeliverySignup(@Body() deliverySignInDto: DeliverySignInDto) {
    return this.authService.signup({
      createDto: deliverySignInDto,
      service: this.deliveryService,
    });
  }
}
