import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { DeliveryRole } from "../entities/delivery.entity";
import { BaseUserQueryDto } from "src/common/dto/user/base-user-query.dto";

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
