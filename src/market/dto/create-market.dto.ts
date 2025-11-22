import { ApiProperty } from "@nestjs/swagger";
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
    type: "string",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "Address of the market",
    example: "Coco",
    type: "string",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: "Id of the owner",
    type: "string",
  })
  @IsUUID()
  ownerId: string;

  @ApiProperty({
    type: "number",
    description: "Id of the city",
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId: number;
}
