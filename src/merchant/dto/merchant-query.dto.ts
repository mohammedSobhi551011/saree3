import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BaseUserQueryDto } from "src/common/dto/user/base-user-query.dto";
import { MerchantRole } from "../entities/merchant.entity";
import { Transform } from "class-transformer";

export class MerchantQuery extends BaseUserQueryDto {
  @ApiProperty({
    description: "Get merchants that has market or not (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  hasMarket?: "true" | "false";

  @ApiProperty({
    description: "Get merchants with their addresses (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withMarket?: "true" | "false";

  @ApiProperty({
    description: "The role of the merchant",
    example: "merchant",
    required: false,
  })
  @IsOptional()
  @IsEnum(MerchantRole)
  role?: MerchantRole;

  @ApiProperty({
    description: "The cityId of the merchant's market",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId?: number;

  @ApiProperty({
    description: "The governmetId of the merchant's market",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  governmentId?: number;
}
