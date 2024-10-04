import { UserService } from "@/user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // if (user && (await user.verifyPassword(password))) {
    //   return user;
    // }
    return null;
  }
}
