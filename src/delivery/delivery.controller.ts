import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { Like } from "typeorm";
import { DeliveryService } from "./delivery.service";
import { Delivery, DeliveryRole } from "./entities/delivery.entity";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/user/entities/user.entity";
import type { Request } from "express";
import { AuthPayload } from "src/common/types";
import { DeliveryQueryDto } from "./dto/delivery-query.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";

@Controller("delivery")
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Roles(UserRole.ADMIN)
  @Get("/")
  findAll(@Query() query: DeliveryQueryDto) {
    const { limit, page, email, isActive, maxBalance, minBalance, name, role } =
      query;
    const withOrders = getBooleanFromString(query.withOrders);
    return this.deliveryService.findAll({
      where: getWhereOrOptions<Delivery>(
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
        orders: withOrders
          ? {
              id: true,
              status: true,
              totalPrice: true,
              orderedAt: true,
              orderedBy: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                email: true,
              },
            }
          : undefined,
      },
      relations: { orders: withOrders },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  @Roles(UserRole.ADMIN, DeliveryRole.DELIVERY)
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string, @Req() req: Request) {
    const { role, sub } = req.user as AuthPayload;
    if (sub !== id && role !== UserRole.ADMIN) throw new ForbiddenException();
    return this.deliveryService.findExistingOne({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        balance: true,
        isActive: role === UserRole.ADMIN && sub !== id,
        role: role === UserRole.ADMIN && sub !== id,
        createdAt: role === UserRole.ADMIN && sub !== id,
        updatedAt: role === UserRole.ADMIN && sub !== id,
      },
    });
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
    @Req() req: Request
  ) {
    const { sub } = req.user as AuthPayload;
    if (sub !== id) throw new ForbiddenException();
    return this.deliveryService.update(id, updateDeliveryDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.deliveryService.remove(id);
  }
}
