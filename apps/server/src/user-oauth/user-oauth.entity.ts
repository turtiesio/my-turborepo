import { DomainBase, EntityBase } from "@/database/entity.base";
import { UserOauthProvider } from "@/user-oauth/user-oauth.enum";
import { UserEntity } from "@/user/entities/user.entity";
import { IsEnum, IsString } from "class-validator";
import { Entity, Column, ManyToOne, Index } from "typeorm";

@Entity()
@Index(["_oauthProvider", "_oauthId"], { unique: true })
export class UserOauthEntity extends EntityBase {
  @Column("text", { name: "oauth_id", nullable: false })
  @IsString()
  _oauthId: string;

  @Column("enum", {
    name: "oauth_provider",
    enum: UserOauthProvider,
    nullable: false,
  })
  @IsEnum(UserOauthProvider)
  _oauthProvider: UserOauthProvider;

  @ManyToOne(() => UserEntity, (user) => user._id, {
    eager: true,
    onDelete: "CASCADE",
  })
  _user: UserEntity;
}

export class UserOauth extends DomainBase<UserOauthEntity> {
  constructor(private readonly schema: UserOauthEntity) {
    super();
  }

  toSchema(): Readonly<UserOauthEntity> {
    return this.schema;
  }

  static async create(opts: {
    oauthId: string;
    oauthProvider: UserOauthProvider;
    user: UserEntity;
  }) {
    const schema = new UserOauthEntity();

    schema._oauthId = opts.oauthId;
    schema._oauthProvider = opts.oauthProvider;
    schema._user = opts.user;

    return new UserOauth(schema);
  }
}
