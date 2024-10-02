import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsDate } from "class-validator";

export class CreateLinkDto {
  @ApiProperty({
    description: "The URL to be shortened",
    example: "https://www.google.com",
  })
  url: string;

  @ApiProperty({
    description: "The expiration date for the link",
    example: "2024-01-01",
  })
  @IsDate()
  expiresAt: Date;
}
