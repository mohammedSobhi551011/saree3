import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayload } from "src/common/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || "defaultSecretKey",
    });
  }

  validate(payload: any): AuthPayload {
    return {
      sub: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  }
}
