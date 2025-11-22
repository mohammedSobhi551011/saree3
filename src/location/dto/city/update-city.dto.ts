import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { CreateCityDto } from "./create-city.dto";

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @ApiPropertyOptional({
    description: "Id of government",
  })
  @IsOptional()
  @IsNumber()
  governmentId?: number;

  @ApiPropertyOptional({
    description: "Name of city",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;
}
