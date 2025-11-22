import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    type: "string",
    example: "John",
    description: "First Name of the User",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName?: string;

  @ApiProperty({
    type: "string",
    example: "Lol",
    description: "Middle Name of the User",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  middleName?: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Last Name of the User",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName?: string;

  @ApiProperty({
    type: "string",
    example: "johndoe",
    description: "Username of the User",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username?: string;

  @ApiProperty({
    type: "string",
    example: "johndoe@example.com",
    description: "Email of the User",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  // @ApiProperty({
  //   enum: UserRole,
  //   enumName: "user's role",
  //   example: "user",
  //   description: "Role of user",
  //   required: false,
  // })
  // @IsEnum(UserRole)
  // @IsOptional()
  // role?: UserRole;
}
