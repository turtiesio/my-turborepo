import { EntityBase } from "@/database/entity.base";
import { IsBoolean, IsEmail, IsString } from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class UserEntity extends EntityBase {
  @Column("varchar", { name: "email", length: 255, nullable: false })
  @IsEmail()
  _email: string;

  @Column("varchar", { name: "username", length: 255, nullable: false })
  @IsString()
  _name: string;

  @Column("boolean", {
    name: "is_active",
    default: false,
    nullable: false,
    comment: "Is the user active",
  })
  @IsBoolean()
  _isActive: boolean;
}
