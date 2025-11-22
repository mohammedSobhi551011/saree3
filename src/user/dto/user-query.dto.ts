import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BaseUserQueryDto } from "src/common/dto/user/base-user-query.dto";
import { UserRole } from "../entities/user.entity";
import { Transform } from "class-transformer";

export class UserQueryDto extends BaseUserQueryDto {
  @ApiProperty({
    description: "Get users with their addresses (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withAddresses?: "true" | "false";

  @ApiProperty({
    description: "The role of the user",
    example: "admin",
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: "The cityId of the user",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId?: number;

  @ApiProperty({
    description: "The governmetId of the user",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  governmentId?: number;
}
