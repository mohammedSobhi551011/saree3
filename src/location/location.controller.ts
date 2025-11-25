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
  UseGuards,
} from "@nestjs/common";
import { LocationService } from "./location.service";
import { Like } from "typeorm";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { getBooleanFromString } from "src/helpers";
import { CityResponseDto } from "./dto/city/city-response.dto";
import { CreateCityDto } from "./dto/city/create-city.dto";
import { CityQueryDto } from "./dto/city/city-query.dto";
import { GovernmentsResponseDto } from "./dto/government/government-response.dto";
import { CreateGovernmentDto } from "./dto/government/create-government.dto";
import { GovernmentQueryDto } from "./dto/government/government-query.dto";
import { UpdateGovernmentDto } from "./dto/government/update-government.dto";
import { CitiesResponseDto } from "./dto/city/cities-reponse.dto";
import { UpdateCityDto } from "./dto/city/update-city.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/user/entities/user.entity";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post("/government")
  @ApiCreatedResponse({ type: GovernmentsResponseDto })
  createGovernment(@Body() createGovernmentDto: CreateGovernmentDto) {
    return this.locationService.createGovernment(createGovernmentDto);
  }

  @Get("/government")
  @ApiOkResponse({
    type: [GovernmentsResponseDto],
  })
  findAllGovernment(@Query() query: GovernmentQueryDto) {
    const { limit, name, page, withCities } = query;

    return this.locationService.findAllGovernments({
      select: { id: true, name: true, cities: { id: true, name: true } },
      where: { name: name ? Like(`%${name}%`) : undefined },
      take: limit,
      skip: (page - 1) * limit,
      relations: { cities: getBooleanFromString(withCities) },
    });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @Patch("/government/:id")
  updateGovernment(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGovernmentDto: UpdateGovernmentDto
  ) {
    return this.locationService.updateGovernment(id, updateGovernmentDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @Delete("government/:id")
  removeGovernment(@Param("id", ParseIntPipe) id: number) {
    this.locationService.removeGovernment(id);
    return;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiCreatedResponse({ type: CityResponseDto })
  @Post("city")
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.locationService.createCity(createCityDto);
  }

  @ApiOkResponse({ type: [CitiesResponseDto] })
  @Get("city")
  findAllCity(@Query() query: CityQueryDto) {
    const { limit, name, page, governmentId, withGovernment, withMarkets } =
      query;

    return this.locationService.findAllCities({
      select: {
        id: true,
        name: true,
        government: { id: true, name: true },
        markets: {
          id: true,
          name: true,
          address: true,
          owner: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
            email: true,
          },
        },
      },
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        government: governmentId ? { id: governmentId } : undefined,
      },
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
      relations: {
        government: getBooleanFromString(withGovernment),
        markets: {
          owner: getBooleanFromString(withMarkets),
        },
      },
    });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: CityResponseDto })
  @Get("city/:id")
  findCity(@Param("id", ParseIntPipe) id: number) {
    return this.locationService.findOneCity({
      select: {
        id: true,
        name: true,
        government: { id: true, name: true },
        markets: {
          id: true,
          name: true,
          address: true,
          owner: {
            id: true,
            username: true,
            firstName: true,
            middleName: true,
            lastName: true,
            email: true,
          },
        },
      },
      where: {
        id,
      },
      relations: {
        government: true,
        markets: {
          owner: true,
        },
      },
    });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: CityResponseDto })
  @Patch("city/:id")
  updateCity(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto
  ) {
    return this.locationService.updateCity(id, updateCityDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @Delete("city/:id")
  removeCity(@Param("id", ParseIntPipe) id: number) {
    this.locationService.removeCity(id);
    return;
  }
}
