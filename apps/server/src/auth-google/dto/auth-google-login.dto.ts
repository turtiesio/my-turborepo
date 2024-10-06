import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthGoogleLoginDto {
  @ApiProperty({ description: "Google ID token" })
  idToken: string;
}
