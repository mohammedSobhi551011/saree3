import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class BaseQueryDto {
  @ApiProperty({
    description: "The page number for pagination",
    example: 1,
    required: true,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number;

  @ApiProperty({
    description: "The limit number for pagination",
    example: 10,
    required: true,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number;
}
