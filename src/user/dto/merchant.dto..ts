import {
  CreateUserDto,
  UpdateUserDto,
  UserActivationTriggerDto,
} from "./user.dto";

export class CreateMerchantDto extends CreateUserDto {}
export class UpdateMerchantDto extends UpdateUserDto {}

export class MerchantActivationTriggerDto extends UserActivationTriggerDto {}
