import { AuthGoogleService } from "@/auth-google/auth-google.service";
import { AuthGoogleLoginDto } from "@/auth-google/dto/auth-google-login.dto";
import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginResponseDto } from "@/auth/dto/login-response.dto";
import { AuthService } from "@/auth/auth.service";
import { UserOauthProvider } from "@/user-oauth/user-oauth.enum";

@Controller("auth/google")
export class AuthGoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGoogleService: AuthGoogleService,
  ) {}

  @ApiOperation({ summary: "Google OAuth login" })
  @ApiResponse({ type: LoginResponseDto })
  @Post("login")
  async login(@Body() dto: AuthGoogleLoginDto) {
    const response = await this.authGoogleService.validate(dto);

    return this.authService.login(UserOauthProvider.GOOGLE, response);
  }
}
