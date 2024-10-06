import { validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

// Schame variable should start with underscore
// Because when typeorm repository takes the schema,
// it accepts as DeepPartial.

// Which means it can take any property of the schema.
// And also with same variable name in other classes.
// Which can cause very hard to debug issues.

function EnforceUnderscorePrefix() {
  return function (constructor: Function) {
    const propertyNames = Object.getOwnPropertyNames(constructor.prototype);

    for (const name of propertyNames) {
      if (
        name === "constructor" ||
        typeof constructor.prototype[name] === "function"
      ) {
        continue;
      }

      if (!name.startsWith("_")) {
        throw new Error(`Property "${name}" must start with an underscore.`);
      }
    }
  };
}

@EnforceUnderscorePrefix()
export class EntityBase {
  @PrimaryColumn({
    name: "id",
    type: "varchar",
    length: 26,
    comment: "ULID ID",
  })
  _id: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  _createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  _updatedAt: Date;

  //

  @BeforeInsert()
  @BeforeUpdate()
  protected async validate() {
    await validateOrReject(this);
  }
}

export abstract class DomainBase<T extends EntityBase> {
  abstract toSchema(): Readonly<T>;
}

export abstract class BaseDto<T> {}
