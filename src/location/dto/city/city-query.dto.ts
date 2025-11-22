import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { BaseQueryDto } from "src/common/dto/base-query.dto";

export class CityQueryDto extends BaseQueryDto {
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

  @ApiPropertyOptional({
    description: "Get city with its government (true | false)",
    example: "true",
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withGovernment?: "true" | "false";

  @ApiPropertyOptional({
    description: "Get city with its markets (true | false)",
    example: "true",
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withMarkets?: "true" | "false";
}
