import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { BaseQueryDto } from "src/common/dto/base-query.dto";

export class AddressQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    type: "string",
    description:
      "SearchQuery for address1, address2 and street of address. Only for admins",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  searchQuery?: string;

  @ApiPropertyOptional({
    type: "number",
    description: "CityId of address. Only for admins",
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  cityId?: number;

  @ApiPropertyOptional({
    type: "string",
    description: "UserId of address. Only for admins",
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
