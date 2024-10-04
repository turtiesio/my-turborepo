import { AuthGoogleService } from "@/auth-google/auth-google.service";
import { AuthGoogleController } from "@/auth-google/auth-google.controller";
import { Module } from "@nestjs/common";

@Module({
  exports: [AuthGoogleService],
  providers: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
