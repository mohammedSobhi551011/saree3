import { ApiProperty } from "@nestjs/swagger";

export class GovernmentCityReponseDto {
  @ApiProperty({ description: "Id of government" })
  id: number;
  @ApiProperty({ description: "Name of government" })
  name: string;
}
