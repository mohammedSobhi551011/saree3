import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { GovernmentResponseDto } from "./government.dto";

export class CreateCityDto {
  @ApiProperty({
    description: "The name of the city",
    example: "New York",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: "The ID of the government this city belongs to",
    example: 1,
  })
  @IsNumber()
  governmentId: number;
}

export class QueryCitiesDto extends QueryDto {
  @ApiProperty({
    description: "The name of the city to filter by",
    example: "York",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: "The ID of the government to filter by",
    example: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  governmentId?: number;

  @ApiProperty({
    description: "Get cities with their government (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  hasGovernment?: "true" | "false";
}


export class QueryCityDto {
  @ApiProperty({
    description: "Get city with its government (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  hasGovernment?: "true" | "false";

  @ApiProperty({
    description: "Get city with its markets (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  hasMarkets?: "true" | "false";
}

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  @IsNumber()
  governmentId?: number | undefined;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string | undefined;
}

export class CityResponseDto {
  @ApiProperty({ description: "the id of the city" })
  id: number;
  @ApiProperty({ description: "the name of the city" })
  name: string;

  @ApiProperty({ description: "the government of the city" })
  government?: GovernmentResponseDto;
}
