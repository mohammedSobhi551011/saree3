import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressQueryDto } from "./dto/address-query.dto";
import { getWhereOrOptions } from "src/helpers";
import { Address } from "./entities/address.entity";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/user/entities/user.entity";
import { type Request } from "express";
import { AuthPayload } from "src/common/types";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Like } from "typeorm";

@UseGuards(JwtGuard, RolesGuard)
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserRole.USER)
  @Post("/")
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: Request) {
    const { sub } = req.user as AuthPayload;
    return this.addressService.create({ ...createAddressDto, userId: sub });
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get("/")
  findAll(@Query() addressQueryDto: AddressQueryDto, @Req() req: Request) {
    const { sub, role } = req.user as AuthPayload;
    const { limit, page, cityId, searchQuery, userId } = addressQueryDto;
    return this.addressService.findAll({
      where: getWhereOrOptions<Address>(
        [
          {
            street:
              role === UserRole.ADMIN ? Like(`%${searchQuery}%`) : undefined,
          },
          {
            address1:
              role === UserRole.ADMIN ? Like(`%${searchQuery}%`) : undefined,
          },
          {
            address2:
              role === UserRole.ADMIN ? Like(`%${searchQuery}%`) : undefined,
          },
        ],
        {
          city: { id: role === UserRole.ADMIN ? cityId : undefined },
          user: {
            id:
              role === UserRole.ADMIN
                ? userId
                : role === UserRole.USER
                  ? sub
                  : undefined,
          },
        }
      ),
      select: {
        id: true,
        address1: true,
        address2: true,
        city: { id: true, name: true, government: { id: true, name: true } },
        user:
          role === UserRole.ADMIN
            ? {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
              }
            : undefined,
      },
      relations: {
        city: {
          government: role === UserRole.ADMIN,
        },
        user: role === UserRole.ADMIN,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  @Roles(UserRole.USER)
  @Patch("/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req: Request
  ) {
    const { sub } = req.user as AuthPayload;
    return this.addressService.update(id, sub, updateAddressDto);
  }

  @Roles(UserRole.USER)
  @Delete("/:id")
  remove(@Req() req: Request, @Param("id", ParseIntPipe) id: number) {
    const { sub } = req.user as AuthPayload;
    return this.addressService.remove(id, sub);
  }
}
