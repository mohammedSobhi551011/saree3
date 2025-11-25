import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
