import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { CityResponseDto } from './city.dto';

export class CreateGovernmentDto {
  @ApiProperty({
    description: 'The name of the government',
    example: 'Cairo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}

export class QueryGovernmentDto extends QueryDto {
  @ApiProperty({
    description: 'The name of the government',
    example: 'Cairo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Get governments with their cities (true | false)',
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsEnum({ true: 'true', false: 'false' })
  hasCities?: 'true' | 'false';
}

export class UpdateGovernmentDto extends PartialType(CreateGovernmentDto) {
  @ApiProperty({
    description: 'The name of the government',
    example: 'Cairo',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string | undefined;
}

export class GovernmentResponseDto {
  @ApiProperty({ description: 'the id of the government' })
  id: number;
  @ApiProperty({ description: 'the name of the government' })
  name: string;

  @ApiProperty({ description: 'the cities of the government', required: false })
  cities?: CityResponseDto[];
}
