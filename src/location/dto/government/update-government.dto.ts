import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateGovernmentDto } from "./create-government.dto";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateGovernmentDto extends PartialType(CreateGovernmentDto) {
  @ApiProperty({
    description: "The name of the government",
    example: "Cairo",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string | undefined;
}
