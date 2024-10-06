import { LoginResponseDto } from "@/auth/dto/login-response.dto";
import { AuthOAuthResponse } from "@/auth/interface/auth-oauth-response.interface";
import { UserOauthProvider } from "@/user-oauth/user-oauth.enum";
import { UserOauthService } from "@/user-oauth/user-oauth.service";
import { UserService } from "@/user/user.service";
import { Injectable, NotImplementedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userOauthService: UserOauthService,
  ) {}

  async login(
    provider: UserOauthProvider,
    data: AuthOAuthResponse,
  ): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(data.email);
    const userOauth = await this.userOauthService.findByProviderId(
      provider as UserOauthProvider,
      data.id,
    );

    if (userOauth) {
      // TODO: JWT
      throw new NotImplementedException();
    }

    // TODO: Create user

    // TODO: Create user oauth

    // TODO: JWT

    return null;
  }
}
