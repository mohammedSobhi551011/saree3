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
  Query,
  Req,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserQueryDto } from "./dto/user.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  PickType,
} from "@nestjs/swagger";
import { Like } from "typeorm";
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { User, UserRole } from "./entities/user.entity";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import type { Request } from "express";
import { AuthPayload } from "src/common/types";

@Controller("/user")
@ApiBearerAuth("JWT-auth")
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get("/")
  findAll(@Query() query: UserQueryDto) {
    const {
      limit,
      page,
      email,
      withAddresses,
      isActive,
      name,
      maxBalance,
      minBalance,
      role,
      cityId,
      governmentId,
    } = query;
    return this.userService.findAll({
      where: getWhereOrOptions<User>(
        [
          { firstName: name ? Like(`%${name}%`) : undefined },
          { middleName: name ? Like(`%${name}%`) : undefined },
          { lastName: name ? Like(`%${name}%`) : undefined },
        ],
        {
          email,
          isActive: getBooleanFromString(isActive),
          role,
          balance: getNumberRangeFindOperator(minBalance, maxBalance),
          addresses: {
            city: { id: cityId, government: { id: governmentId } },
          },
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
        addresses: {
          id: true,
          address1: true,
          address2: true,
          street: true,
          city: { id: true, name: true, government: { id: true, name: true } },
        },
      },
      relations: {
        addresses: getBooleanFromString(withAddresses)
          ? { city: { government: true } }
          : undefined,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string, @Req() req: Request) {
    const { sub, role } = req.user as AuthPayload;
    if (role !== UserRole.ADMIN && sub !== id) throw new ForbiddenException();
    return this.userService.findExistingOne({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        createdAt: role === UserRole.ADMIN && sub !== id,
        updatedAt: role === UserRole.ADMIN && sub !== id,
        isActive: role === UserRole.ADMIN && sub !== id,
        role: role === UserRole.ADMIN && sub !== id,
        balance: true,
        addresses: {
          id: true,
          address1: true,
          address2: true,
          city: { id: true, name: true, government: { id: true, name: true } },
          street: true,
        },
      },
      relations: {
        addresses: { city: { government: true } },
      },
    });
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    const { sub } = req.user as AuthPayload;
    if (sub !== id) throw new ForbiddenException();
    return this.userService.update(id, updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
