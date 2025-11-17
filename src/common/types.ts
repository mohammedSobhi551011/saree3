export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export enum MerchantRole {
  MERCHANT = "merchant",
}

export enum DeliveryRole {
  DELIVERY = "delivery",
}

export type Role = DeliveryRole | MerchantRole | UserRole;

export type UserPayload = {
  sub: string;
  username: string;
  email: string;
  role: Role;
};
