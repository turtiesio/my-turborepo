import { AuthGoogleService } from "@/auth-google/auth-google.service";
import { AuthGoogleController } from "@/auth-google/auth-google.controller";
import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth/auth.module";

@Module({
  imports: [AuthModule],
  exports: [AuthGoogleService],
  providers: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
