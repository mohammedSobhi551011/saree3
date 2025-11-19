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
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserQueryDto } from "./dto/user.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guards/roles.guard";
import { Like } from "typeorm";
import {
  getBooleanFromString,
  getNumberRangeFindOperator,
  getWhereOrOptions,
} from "src/helpers";
import { User, UserRole } from "./entities/user.entity";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findExistingOne({
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
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
