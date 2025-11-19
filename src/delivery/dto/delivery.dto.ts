import { QueryDto } from "src/common/dto/query.dto";
import {
  CreateUserDto,
  UpdateUserDto,
  UserActivationTriggerDto,
} from "src/user/dto/user.dto";
import { BaseUserQueryDto } from "src/common/dto/base-user-query.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { DeliveryRole } from "../entities/delivery.entity";

export class CreateDeliveryDto extends CreateUserDto {}
export class UpdateDeliveryDto extends UpdateUserDto {}
export class DeliveryActivationTriggerDto extends UserActivationTriggerDto {}

export class DeliveryQueryDto extends BaseUserQueryDto {
  @ApiProperty({
    description: "The role of the delivery",
    example: "delivery",
    required: false,
  })
  @IsOptional()
  @IsEnum(DeliveryRole)
  role?: DeliveryRole;

  @ApiProperty({
    description: "Get delivery with their orders (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withOrders?: "true" | "false";
}
