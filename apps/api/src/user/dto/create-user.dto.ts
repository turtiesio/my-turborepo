import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
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
}
