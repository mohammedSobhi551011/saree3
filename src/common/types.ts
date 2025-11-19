import { DeliveryRole } from "src/delivery/entities/delivery.entity";
import { MerchantRole } from "src/merchant/entities/merchant.entity";
import { UserRole } from "src/user/entities/user.entity";

export type Role = DeliveryRole | MerchantRole | UserRole;

export type AuthPayload = {
  sub: string;
  username: string;
  email: string;
  role: Role;
};
