import { ulid, ulidToUUID, uuidToULID } from "ulidx";

export function generateId(): string {
  return ulid();
}
