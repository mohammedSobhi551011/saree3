import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { DeliveryModule } from "src/delivery/delivery.module";
import { MerchantModule } from "src/merchant/merchant.module";

@Module({
  imports: [
    UserModule,
    DeliveryModule,
    MerchantModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || "defaultSecretKey",
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
