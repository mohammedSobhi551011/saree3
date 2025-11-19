import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { MerchantService } from "./merchant.service";
import {
  CreateMerchantDto,
  MerchantQuery,
  UpdateMerchantDto,
} from "./dto/merchant.dto.";
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { Merchant } from "./entities/merchant.entity";
import { IsNull, Like, Not } from "typeorm";

@Controller("merchant")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}
  @Post("")
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get("")
  findAll(@Query() query: MerchantQuery) {
    const {
      limit,
      page,
      isActive,
      maxBalance,
      minBalance,
      name,
      email,
      role,
      cityId,
      governmentId,
      withMarket,
    } = query;
    const hasMarket = getBooleanFromString(query.hasMarket);

    return this.merchantService.findAll({
      where: getWhereOrOptions<Merchant>(
        [
          { firstName: name ? Like(`%${name}%`) : undefined },
          { middleName: name ? Like(`%${name}%`) : undefined },
          { lastName: name ? Like(`%${name}%`) : undefined },
        ],
        {
          email,
          isActive: getBooleanFromString(isActive),
          balance: getNumberRangeFindOperator(minBalance, maxBalance),
          role,
          marketId:
            hasMarket === undefined
              ? undefined
              : hasMarket
                ? Not(IsNull())
                : IsNull(),
        }
      ),
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        createdAt: true,
        isActive: true,
        role: true,
        balance: true,
        market: hasMarket
          ? {
              id: true,
              address: true,
              city: cityId
                ? {
                    id: true,
                    name: true,
                    government: governmentId
                      ? { id: true, name: true }
                      : undefined,
                  }
                : undefined,
              name: true,
            }
          : undefined,
      },
      relations: {
        market: getBooleanFromString(withMarket)
          ? { city: { government: true } }
          : undefined,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.merchantService.findExistingOne({ where: { id } });
  }

  @Patch(":id")
  updateMerchant(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateMerchantDto: UpdateMerchantDto
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.merchantService.remove(id);
  }
}
