import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class UserActivationTriggerDto {
  @ApiProperty({
    type: "boolean",
    example: true,
    description: "Activate or Deactivate the User",
  })
  @IsEnum({ true: "true", false: "false" })
  isActive: boolean;
}
