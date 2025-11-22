import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGovernmentDto {
  @ApiProperty({
    description: "The name of the government",
    example: "Cairo",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
