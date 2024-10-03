import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "User's active status", type: Boolean })
  @IsBoolean()
  isActive: boolean;
}
