import { ApiProperty } from "@nestjs/swagger";

export class MerchantMarketReponseDto {
  @ApiProperty({
    description: "Id of Merchant",
  })
  id: string;

  @ApiProperty({
    description: "FirstName of Merchant",
  })
  firstName: string;

  @ApiProperty({
    description: "MiddleName of Merchant",
  })
  middleName: string;

  @ApiProperty({
    description: "LastName of Merchant",
  })
  lastName: string;

  @ApiProperty({
    description: "FullName of Merchant",
  })
  fullName: string;

  @ApiProperty({
    description: "Email of Merchant",
  })
  email: string;
}
