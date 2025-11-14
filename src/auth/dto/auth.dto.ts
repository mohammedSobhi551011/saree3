import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "testuser", description: "Username of the user" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "testpassword", description: "Password of the user" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
