import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { MerchantService } from "./merchant.service";
import {
  // CreateMerchantDto,
  MerchantQuery,
  UpdateMerchantDto,
} from "./dto/merchant.dto.";
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { Merchant, MerchantRole } from "./entities/merchant.entity";
import { IsNull, Like, Not } from "typeorm";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/user/entities/user.entity";
import type { Request } from "express";
import { AuthPayload } from "src/common/types";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller("merchant")
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}
  // @Post("")
  // create(@Body() createMerchantDto: CreateMerchantDto) {
  //   return this.merchantService.create(createMerchantDto);
  // }

  @Roles(UserRole.ADMIN)
  @Get("/")
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
        marketId: hasMarket ? true : undefined,
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

  @Roles(UserRole.ADMIN, MerchantRole.MERCHANT)
  @Get("/:id")
  findOne(@Param("id", ParseUUIDPipe) id: string, @Req() req: Request) {
    const { sub, role } = req.user as AuthPayload;
    if (sub !== id && role !== UserRole.ADMIN) throw new ForbiddenException();

    return this.merchantService.findExistingOne({
      where: { id },
      select: {
        id: true,
        balance: true,
        email: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        isActive: role === UserRole.ADMIN && sub !== id,
        role: role === UserRole.ADMIN && sub !== id,
        createdAt: role === UserRole.ADMIN && sub !== id,
        updatedAt: role === UserRole.ADMIN && sub !== id,
        market: {
          id: true,
          name: true,
          address: true,
          city: { id: true, name: true, government: { id: true, name: true } },
        },
      },
      relations: {
        market: { city: { government: true } },
      },
    });
  }

  @Patch("/:id")
  updateMerchant(
    @Param("/id", ParseUUIDPipe) id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
    @Req() req: Request
  ) {
    const { sub } = req.user as AuthPayload;
    if (sub !== id) throw new ForbiddenException();
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete("/:id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.merchantService.remove(id);
  }
}
