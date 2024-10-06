import { User } from "@/user/domain/user.domain";
import { BaseDto } from "@/database/entity.base";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto extends BaseDto<User> {
  @ApiProperty({ description: "User's name" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  toEntity(isActive: boolean = true) {
    return User.create({
      name: this.name,
      isActive,
    });
  }
}
