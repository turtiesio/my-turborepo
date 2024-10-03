import { generateId } from "@/utils/id";
import { validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export class EntityBase {
  @PrimaryColumn({ type: "varchar", length: 26, comment: "ULID User ID" })
  id: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
