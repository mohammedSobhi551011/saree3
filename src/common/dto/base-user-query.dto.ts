import { ApiProperty } from "@nestjs/swagger";
import { QueryDto } from "./query.dto";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export class BaseUserQueryDto extends QueryDto {
  @ApiProperty({
    description: "The name of the user",
    example: "John",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: "The email of the user",
    example: "Jeo@lol.com",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Get users that is active (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  isActive?: "true" | "false";

  @ApiProperty({
    description: "The minimum balance of the user",
    example: "0",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minBalance?: number;

  @ApiProperty({
    description: "The maximum balance of the user",
    example: "500",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxBalance?: number;
}
