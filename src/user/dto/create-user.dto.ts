import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";
import { UserRole } from "../entities/user.entity";
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

  @ApiProperty({
    enum: UserRole,
    enumName: "user's role",
    example: "user",
    description: "Role of user",
  })
  @IsEnum(UserRole)
  role: UserRole;
}
