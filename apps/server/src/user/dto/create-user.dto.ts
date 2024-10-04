import { User } from "@/user/entities/user.entity";
import { BaseDto } from "@/database/entity.base";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto extends BaseDto<User> {
  @ApiProperty({ description: "User's first name", type: String })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  firstName: string;

  @ApiProperty({ description: "User's last name", type: String })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  lastName: string;

  @ApiProperty({ description: "User's password", type: String })
  @IsString()
  @IsOptional()
  password?: string;

  toEntity(isActive: boolean = true) {
    return User.create({
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      isActive,
    });
  }
}
