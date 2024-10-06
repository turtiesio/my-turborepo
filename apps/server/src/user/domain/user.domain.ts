import { DomainBase } from "@/database/entity.base";
import { UserEntity } from "@/user/entities/user.entity";
import { hashPassword, verifyPassword } from "@/utils/encrypt";
import { generateId } from "@/utils/id";
import { instanceToPlain } from "class-transformer";

export class User extends DomainBase<UserEntity> {
  constructor(private readonly schema: UserEntity) {
    super();
  }

  toSchema(): Readonly<UserEntity> {
    return this.schema;
  }

  static async create(opts: { name: string; isActive: boolean }) {
    const schema = new UserEntity();

    schema._id = generateId();
    schema._name = opts.name;
    schema._isActive = opts.isActive ?? false;

    return new User(schema);
  }
}
