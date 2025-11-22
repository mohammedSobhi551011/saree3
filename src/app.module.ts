import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MarketModule } from "./market/market.module";
import { OrderModule } from "./order/order.module";
import { LocationModule } from "./location/location.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DeliveryModule } from './delivery/delivery.module';
import { MerchantModule } from './merchant/merchant.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".development.env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || "mysql",
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "test",
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
    UserModule,
    MarketModule,
    OrderModule,
    LocationModule,
    AuthModule,
    DeliveryModule,
    MerchantModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
