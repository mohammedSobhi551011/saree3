import { ApiProperty } from "@nestjs/swagger";
import { MerchantMarketReponseDto } from "src/merchant/dto/merchant-market-reponse.dto";

export class MarketCityReponseDto {
  @ApiProperty({ description: "the id of the market" })
  id: number;
  @ApiProperty({ description: "the name of the market" })
  name: string;

  @ApiProperty({
    description: "Address of the market",
  })
  address: string;

  @ApiProperty({ type: MerchantMarketReponseDto })
  owner: MerchantMarketReponseDto;
}
