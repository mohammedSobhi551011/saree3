import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateAddressDto {
  @ApiProperty({ type: "string", maximum: 255, minimum: 5 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(5)
  street: string;
  @ApiProperty({ type: "string", maximum: 255, minimum: 5 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(5)
  address1: string;
  @ApiProperty({ type: "string", maximum: 255, minimum: 5 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(5)
  address2: string;
  @ApiProperty({ type: "number", description: "CityId of address" })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId: number;
}
