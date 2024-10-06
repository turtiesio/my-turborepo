import { UserOauthEntity } from "@/user-oauth/user-oauth.entity";
import { UserOauthProvider } from "@/user-oauth/user-oauth.enum";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserOauthService {
  constructor(
    @InjectRepository(UserOauthEntity)
    private readonly userOauthRepository: Repository<UserOauthEntity>,
  ) {}

  async findByProviderId(provider: UserOauthProvider, providerId: string) {
    return this.userOauthRepository.findOne({
      where: {
        _oauthProvider: provider,
        _oauthId: providerId,
      },
    });
  }

  async create(userOauth: UserOauthEntity) {
    return this.userOauthRepository.save(userOauth);
  }
}
