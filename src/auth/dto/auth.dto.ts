import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateDeliveryDto } from "src/delivery/dto/create-delivery.dto";
import { CreateMerchantDto } from "src/merchant/dto/create-merchant.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class LoginDto {
  @ApiProperty({ example: "testuser", description: "Username of the user" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "testpassword", description: "Password of the user" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserSignInDto extends CreateUserDto {}
export class MerchantSignInDto extends CreateMerchantDto {}
export class DeliverySignInDto extends CreateDeliveryDto {}
