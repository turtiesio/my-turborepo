import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "@/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
