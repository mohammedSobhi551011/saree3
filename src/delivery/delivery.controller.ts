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
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { Like } from "typeorm";
import { DeliveryService } from "./delivery.service";
import { Delivery } from "./entities/delivery.entity";
import {
  CreateDeliveryDto,
  DeliveryQueryDto,
  UpdateDeliveryDto,
} from "./dto/delivery.dto";

@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}
  @Post("/")
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

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

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.deliveryService.findExistingOne({
      where: { id },
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
      },
    });
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.deliveryService.update(id, updateDeliveryDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.deliveryService.remove(id);
  }
}
