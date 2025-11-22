import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GovernmentCityReponseDto } from "../government/government-city-reponse.dto";
import { MarketCityReponseDto } from "src/market/dto/market-reponse.dto";

export class CitiesResponseDto {
  @ApiProperty({ description: "the id of the city" })
  id: number;
  @ApiProperty({ description: "the name of the city" })
  name: string;

  @ApiPropertyOptional({
    description: "Government of city included only if withGovernment is true",
    type: () => GovernmentCityReponseDto,
  })
  government?: GovernmentCityReponseDto;

  @ApiPropertyOptional({
    description: "Markets of city included only if withMarkets is true",
    type: [MarketCityReponseDto],
  })
  markets?: MarketCityReponseDto[];
}
