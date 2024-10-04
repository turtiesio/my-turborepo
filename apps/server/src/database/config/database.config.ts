import { registerAs } from "@nestjs/config";

import { IsString } from "class-validator";
import validateConfig from "@/utils/validate-config";
import { DatabaseConfig } from "@/database/config/database.config.type";

class EnvironmentVariablesValidator {
  @IsString()
  DATABASE_URL: string;
}

export default registerAs<DatabaseConfig>("database", () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: config.DATABASE_URL,
  };
});
