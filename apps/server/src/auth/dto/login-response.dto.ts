import { UserEntity } from "@/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({ description: "Access token" })
  access_token: string;

  @ApiProperty({ description: "Access token expiration timestamp" })
  access_token_expires_at: number;

  @ApiProperty({ description: "Refresh token" })
  refresh_token: string;

  @ApiProperty({ description: "User", type: UserEntity })
  user: UserEntity;
}
