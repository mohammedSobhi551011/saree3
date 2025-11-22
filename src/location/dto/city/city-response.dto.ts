import { ApiProperty } from "@nestjs/swagger";
import { GovernmentCityReponseDto } from "../government/government-city-reponse.dto";
import { MarketCityReponseDto } from "src/market/dto/market-reponse.dto";

export class CityResponseDto {
  @ApiProperty({ description: "the id of the city" })
  id: number;
  @ApiProperty({ description: "the name of the city" })
  name: string;

  @ApiProperty({
    description: "Government of city",
    type: () => GovernmentCityReponseDto,
  })
  government: GovernmentCityReponseDto;

  @ApiProperty({
    description: "Markets of city",
    type: [MarketCityReponseDto],
  })
  markets: MarketCityReponseDto[];
}
