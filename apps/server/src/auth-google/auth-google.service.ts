import { AuthGoogleLoginDto } from "@/auth-google/dto/auth-google-login.dto";
import { AuthOAuthResponse } from "@/auth/interface/auth-oauth-response.interface";
import { AllConfigType } from "@/config/config.type";

import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthGoogleService {
  private readonly google: OAuth2Client;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.google = new OAuth2Client(
      this.configService.getOrThrow("app.googleClientId", { infer: true }),
      this.configService.getOrThrow("app.googleClientSecret", { infer: true }),
    );
  }

  async validate(dto: AuthGoogleLoginDto): Promise<AuthOAuthResponse> {
    const ticket = await this.google.verifyIdToken({
      idToken: dto.idToken,
      audience: this.configService.getOrThrow("app.googleClientId", {
        infer: true,
      }),
    });

    const data = ticket.getPayload();

    if (!data) {
      throw new UnprocessableEntityException("Invalid token");
    }

    return {
      id: data.sub,
      name: data.name ?? data.given_name ?? data.family_name ?? "",
      email: data.email,
      picture: data.picture,
    };
  }
}
