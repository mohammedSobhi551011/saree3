import {
  CreateUserDto,
  UpdateUserDto,
  UserActivationTriggerDto,
} from "./user.dto";

export class CreateDeliveryDto extends CreateUserDto {}
export class UpdateDeliveryDto extends UpdateUserDto {}
export class DeliveryActivationTriggerDto extends UserActivationTriggerDto {}
