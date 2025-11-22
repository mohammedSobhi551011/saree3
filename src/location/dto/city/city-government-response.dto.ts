import { ApiProperty } from "@nestjs/swagger";

export class CityGovernmentResponseDto {
  @ApiProperty({ description: "Id of city" })
  id: number;
  @ApiProperty({ description: "Name of city" })
  name: string;
}
