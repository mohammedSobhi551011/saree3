import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

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
