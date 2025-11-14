import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateMarketDto {
  @ApiProperty({
    description: "Name of the market",
    example: "Coco",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "Address of the market",
    example: "Coco",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: "Id of the owner",
  })
  @IsUUID()
  ownerId: string;

  @ApiProperty({
    description: "Id of the city",
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId: number;
}

export class UpdateMarketDto extends PartialType(CreateMarketDto) {}
