import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOauthEntity } from "./user-oauth.entity";
import { UserOauthService } from "./user-oauth.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserOauthEntity])],
  providers: [UserOauthService],
  exports: [UserOauthService],
})
export class UserOauthModule {}
