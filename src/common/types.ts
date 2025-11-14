import { UserRole } from "src/user/entities/user.entity";

export type UserPayload = {
  sub: string;
  username: string;
  email: string;
  role?: UserRole;
};
