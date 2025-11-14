import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
    example: "John",
    description: "First Name of the User",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    type: "string",
    example: "Lol",
    description: "Middle Name of the User",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  middleName: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Last Name of the User",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    type: "string",
    example: "johndoe",
    description: "Username of the User",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: "string",
    example: "johndoe@example.com",
    description: "Email of the User",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: "string",
    example: "password123",
    description: "Password of the User",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  password: string;
}

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
}

export class UserActivationTriggerDto {
  @ApiProperty({
    type: "boolean",
    example: true,
    description: "Activate or Deactivate the User",
  })
  @IsEnum({ true: "true", false: "false" })
  isActive: boolean;
}
