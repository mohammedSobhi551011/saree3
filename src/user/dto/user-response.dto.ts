import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AddressUserResponseDto } from "src/address/dto/address-user-response.dto";
import { BaseUserResponseDto } from "src/common/dto/user/base-user-reponse.dto";

export class UsersReponseDto extends BaseUserResponseDto {
  @ApiProperty({
    type: "boolean",
    example: "true",
    description: "IsActive state of the User",
  })
  isActive: boolean;

  @ApiProperty({
    type: Date,
    example: "date",
    description: "createdAt of the User",
  })
  createdAt: Date;

  @ApiPropertyOptional({
    type: [AddressUserResponseDto],
    description: "Addresses of the user included only if withAddresses is true",
  })
  addresses?: AddressUserResponseDto;
}
