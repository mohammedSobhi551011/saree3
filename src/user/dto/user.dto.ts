import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";
import { BaseUserQueryDto } from "src/common/dto/base-user-query.dto";
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

export class UserActivationTriggerDto {
  @ApiProperty({
    type: "boolean",
    example: true,
    description: "Activate or Deactivate the User",
  })
  @IsEnum({ true: "true", false: "false" })
  isActive: boolean;
}

export class UserQueryDto extends BaseUserQueryDto {
  @ApiProperty({
    description: "Get users with their addresses (true | false)",
    example: "true",
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: "true", false: "false" })
  withAddresses?: "true" | "false";

  @ApiProperty({
    description: "The role of the user",
    example: "admin",
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: "The cityId of the user",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cityId?: number;

  @ApiProperty({
    description: "The governmetId of the user",
    example: "1",
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  governmentId?: number;
}
