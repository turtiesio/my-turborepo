import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "@/user/user.module";
import { UserOauthModule } from "@/user-oauth/user-oauth.module";

@Module({
  imports: [UserModule, UserOauthModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
