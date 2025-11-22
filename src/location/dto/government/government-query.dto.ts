import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseQueryDto } from "src/common/dto/base-query.dto";

export class GovernmentQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: "The name of the government",
    example: "Cairo",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: "Get governments with their cities (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withCities?: "true" | "false";
}
