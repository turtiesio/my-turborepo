import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// Bcrypt hash format: $2[ayb]$[cost]$[22 character salt][31 character hash]
export function isBcryptHash(str: string) {
  const bcryptRegex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;
  return bcryptRegex.test(str);
}
