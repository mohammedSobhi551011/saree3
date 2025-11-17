import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { CreateMerchantDto, UpdateMerchantDto } from "./dto/merchant.dto.";
import { CreateDeliveryDto, UpdateDeliveryDto } from "./dto/delivery.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import type { Request } from "express";
import { Roles } from "./decorators/roles.decorator";
import { DeliveryRole, UserRole } from "src/common/types";
import { RolesGuard } from "./guards/roles.guard";

@Controller("")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // User Endpoints

  @Post("/user")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @ApiBearerAuth("JWT-auth")
  // @Roles(UserRole.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get("/user")
  findAllUsers() {
    return this.userService.findAllUsers({
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
      },
    });
  }

  @Get("/user/:id")
  findOneUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findExistingOneUser({ where: { id } });
  }

  @Patch("/user/:id")
  updateUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete("/user/:id")
  removeUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id);
  }

  // Merchant Endpoints
  @Post("/merchant")
  createMerchant(@Body() createMerchantDto: CreateMerchantDto) {
    return this.userService.createMerchant(createMerchantDto);
  }

  @Get("/merchant")
  findAllMerchants() {
    return this.userService.findAllMerchants({
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        createdAt: true,
        isActive: true,
      },
    });
  }

  @Get("/merchant/:id")
  findOneMerchant(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findExistingOneMerchant({ where: { id } });
  }

  @Patch("/merchant/:id")
  updateMerchant(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateMerchantDto: UpdateMerchantDto
  ) {
    return this.userService.updateMerchant(id, updateMerchantDto);
  }

  @Delete("/merchant/:id")
  removeMerchant(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.removeMerchant(id);
  }

  // Delivery Endpoints
  @Post("/delivery")
  createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.userService.createDelivery(createDeliveryDto);
  }

  @Get("/delivery")
  findAllDeliveries() {
    return this.userService.findAllDeliveries({
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        createdAt: true,
        isActive: true,
      },
    });
  }

  @Get("/delivery/:id")
  findOneDelivery(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findExistingOneDelivery({ where: { id } });
  }

  @Patch("/delivery/:id")
  updateDelivery(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.userService.updateDelivery(id, updateDeliveryDto);
  }

  @Delete("/delivery/:id")
  removeDelivery(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.removeDelivery(id);
  }
}
