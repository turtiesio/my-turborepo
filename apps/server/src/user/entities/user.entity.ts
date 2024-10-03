import { EntityBase } from "@/database/entity.base";
import { generateId } from "@/utils/id";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends EntityBase {
  @Column("varchar", { length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column("varchar", { length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column("boolean", {
    default: false,
    nullable: false,
    comment: "Is the user active",
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  //

  static create(
    opts: Omit<User, "id" | "createdAt" | "updatedAt" | "validate">,
  ) {
    const user = new User();

    user.id = generateId();
    user.firstName = opts.firstName;
    user.lastName = opts.lastName;
    user.isActive = opts.isActive ?? false;

    return user;
  }
}
