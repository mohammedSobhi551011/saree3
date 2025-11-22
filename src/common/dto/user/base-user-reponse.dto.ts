import { ApiProperty } from "@nestjs/swagger";

export class BaseUserResponseDto {
  @ApiProperty({
    type: "string",
    example: "id",
    description: "Id of the User",
  })
  id: string;

  @ApiProperty({
    type: "string",
    example: "John",
    description: "First Name of the User",
  })
  firstName: string;

  @ApiProperty({
    type: "string",
    example: "Lol",
    description: "Middle Name of the User",
  })
  middleName: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Last Name of the User",
  })
  lastName: string;

  @ApiProperty({
    type: "string",
    example: "Doe",
    description: "Full Name of the User",
  })
  fullName: string;

  @ApiProperty({
    type: "string",
    example: "johndoe",
    description: "Username of the User",
  })
  username: string;

  @ApiProperty({
    type: "string",
    example: "johndoe@example.com",
    description: "Email of the User",
  })
  email: string;

  @ApiProperty({
    type: "number",
    example: "50",
    description: "Balance of the User",
  })
  balance: number;
}
