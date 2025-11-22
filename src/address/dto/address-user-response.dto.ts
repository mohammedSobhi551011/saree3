import { ApiProperty } from "@nestjs/swagger";
import { CityAddressResponseDto } from "src/location/dto/city/city-address-response.dto";

export class AddressUserResponseDto {
  @ApiProperty({ type: "number", description: "Id of address" })
  id: number;
  @ApiProperty({ type: "string", description: "Street of address" })
  street: string;
  @ApiProperty({ type: "string", description: "Address1 of address" })
  address1: string;
  @ApiProperty({ type: "string", description: "Address2 of address" })
  address2: string;
  @ApiProperty({ type: CityAddressResponseDto, description: "City of address" })
  city: CityAddressResponseDto;
}
