import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CityGovernmentResponseDto } from "../city/city-government-response.dto";

export class GovernmentsResponseDto {
  @ApiProperty({ description: "Id of government" })
  id: number;
  @ApiProperty({ description: "Name of government" })
  name: string;

  @ApiPropertyOptional({
    description: "Cities of government included if withCities is true",
    type: () => [CityGovernmentResponseDto],
  })
  cities?: CityGovernmentResponseDto[];
}
