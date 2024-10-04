import { EntityBase, SchemaBase } from "@/database/entity.base";
import { hashPassword, isBcryptHash, verifyPassword } from "@/utils/encrypt";
import { generateId } from "@/utils/id";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class UserSchema extends SchemaBase {
  // email
  @Column("varchar", { name: "email", length: 255, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  _email: string;

  @Column("varchar", { name: "first_name", length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  _firstName: string;

  @Column("varchar", { name: "last_name", length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  _lastName: string;

  @Column("boolean", {
    name: "is_active",
    default: false,
    nullable: false,
    comment: "Is the user active",
  })
  @IsBoolean()
  @IsNotEmpty()
  _isActive: boolean;

  @Column("text", {
    name: "hashed_password",
    nullable: true,
    comment: "Hashed password",
  })
  @IsString()
  @IsOptional()
  _hashedPassword?: string;
}

export class User extends EntityBase<UserSchema> {
  constructor(private readonly schema: UserSchema) {
    super();
  }

  toSchema(): Readonly<UserSchema> {
    return this.schema;
  }

  async isPasswordValid(password: string) {
    if (!this.schema._hashedPassword) {
      return false;
    }

    return await verifyPassword(password, this.schema._hashedPassword);
  }

  static async create(opts: {
    firstName: string;
    lastName: string;
    isActive: boolean;
    password?: string; // take plaintext password and hash it
  }) {
    const schema = new UserSchema();

    schema._id = generateId();
    schema._firstName = opts.firstName;
    schema._lastName = opts.lastName;
    schema._isActive = opts.isActive ?? false;
    schema._hashedPassword = opts.password
      ? await hashPassword(opts.password)
      : undefined;

    return new User(schema);
  }
}
