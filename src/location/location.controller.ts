import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { LocationService } from "./location.service";
import { Like } from "typeorm";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import {
  CreateGovernmentDto,
  GovernmentResponseDto,
  QueryGovernmentDto,
  UpdateGovernmentDto,
} from "./dto/government.dto";
import {
  CityResponseDto,
  CreateCityDto,
  QueryCitiesDto,
  QueryCityDto,
  UpdateCityDto,
} from "./dto/city.dto";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post("/government")
  @ApiCreatedResponse({ type: GovernmentResponseDto })
  createGovernment(@Body() createGovernmentDto: CreateGovernmentDto) {
    return this.locationService.createGovernment(createGovernmentDto);
  }

  @Get("/government")
  @ApiOkResponse({
    type: GovernmentResponseDto,
  })
  findAllGovernment(@Query() query: QueryGovernmentDto) {
    const { limit, name, page, hasCities } = query;

    return this.locationService.findAllGovernments({
      select: { id: true, name: true, cities: { id: true, name: true } },
      where: { name: name ? Like(`%${name}%`) : undefined },
      take: limit,
      skip: (page - 1) * limit,
      relations: { cities: hasCities === "true" },
    });
  }

  @ApiOkResponse({ type: GovernmentResponseDto })
  @Patch("/government/:id")
  updateGovernment(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGovernmentDto: UpdateGovernmentDto
  ) {
    return this.locationService.updateGovernment(id, updateGovernmentDto);
  }

  @ApiOkResponse()
  @Delete("government/:id")
  removeGovernment(@Param("id", ParseIntPipe) id: number) {
    this.locationService.removeGovernment(id);
    return;
  }

  @ApiCreatedResponse({ type: CityResponseDto })
  @Post("city")
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.locationService.createCity(createCityDto);
  }

  @ApiOkResponse({ type: CityResponseDto })
  @Get("city")
  findAllCity(@Query() query: QueryCitiesDto) {
    const { limit, name, page, governmentId, hasGovernment } = query;

    return this.locationService.findAllCities({
      select: { id: true, name: true, government: { id: true, name: true } },
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        government: governmentId ? { id: governmentId } : undefined,
      },
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
      relations: { government: hasGovernment === "true" },
    });
  }

  @ApiOkResponse({ type: CityResponseDto })
  @Get("city/:id")
  findCity(@Query() query: QueryCityDto, @Param("id",ParseIntPipe) id:number) {
    const { hasMarkets, hasGovernment } = query;

    return this.locationService.findOneCity({
      select: { id: true, name: true, government: { id: true, name: true },markets:{id:true,name:true,address:true,owner:{id:true,username:true,fullName:true}} },
      where: {
        id,
      },
      relations: { government: hasGovernment === "true",markets:{
        owner: hasMarkets==="true"
      } },
    });
  }

  @ApiOkResponse({ type: CityResponseDto })
  @Patch("city/:id")
  updateCity(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto
  ) {
    return this.locationService.updateCity(id, updateCityDto);
  }

  @ApiOkResponse()
  @Delete("city/:id")
  removeCity(@Param("id", ParseIntPipe) id: number) {
    this.locationService.removeCity(id);
    return;
  }
}
