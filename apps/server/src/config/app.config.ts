import { registerAs } from "@nestjs/config";
import validateConfig from "@/utils/validate-config";
import { IsEnum, IsInt, IsString, IsUrl, Max, Min } from "class-validator";
import { AppConfig } from "@/config/app.config.type";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  APP_NAME: string = "app";

  @IsInt()
  @Min(0)
  @Max(65535)
  APP_PORT: number = 3000;

  @IsString()
  PWD: string = process.cwd();

  @IsUrl({ require_tld: false })
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  BACKEND_DOMAIN: string = "http://localhost";

  @IsString()
  API_PREFIX: string = "api";

  @IsString()
  APP_FALLBACK_LANGUAGE: string = "en";

  @IsString()
  APP_HEADER_LANGUAGE: string = "x-custom-lang";
}

export default registerAs<AppConfig>("app", () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: config.NODE_ENV,

    appName: config.APP_NAME,
    appPort: config.APP_PORT,

    apiPrefix: config.API_PREFIX,

    pwd: config.PWD,

    frontendDomain: config.FRONTEND_DOMAIN,
    backendDomain: config.BACKEND_DOMAIN,

    fallbackLanguage: config.APP_FALLBACK_LANGUAGE,
    headerLanguage: config.APP_HEADER_LANGUAGE,
  };
});
