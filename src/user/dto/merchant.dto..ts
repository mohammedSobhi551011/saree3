import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateMerchantDto {
  @ApiProperty({
    type: "string",
    example: "John",
    description: "First Name of the Merchant",
  })
  firstName: string;

  @ApiProperty({
    type: "string",
    example: "Lol",
    description: "Middle Name of the Merchant",
  })
  middleName: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Last Name of the Merchant",
  })
  lastName: string;

  @ApiProperty({
    type: "string",
    example: "johndoe",
    description: "Username of the Merchant",
  })
  username: string;

  @ApiProperty({
    type: "string",
    example: "johndoe@example.com",
    description: "Email of the Merchant",
  })
  email: string;

  @ApiProperty({
    type: "string",
    example: "password123",
    description: "Password of the Merchant",
  })
  password: string;
}
export class UpdateMerchantDto {
  @ApiProperty({
    type: "string",
    example: "John",
    description: "First Name of the Merchant",
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    type: "string",
    example: "Lol",
    description: "Middle Name of the Merchant",
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Last Name of the Merchant",
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    type: "string",
    example: "johndoe",
    description: "Username of the Merchant",
    required: false,
  })
  username?: string;

  @ApiProperty({
    type: "string",
    example: "johndoe@example.com",
    description: "Email of the Merchant",
    required: false,
  })
  email?: string;
}

export class MerchantActivationTriggerDto {
  @ApiProperty({
    type: "boolean",
    example: true,
    description: "Activate or Deactivate the Merchant",
  })
  isActive: boolean;
}
