import validateConfig from "@/utils/validate-config";
import { registerAs } from "@nestjs/config";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  @IsOptional()
  APP_NAME: string = "app";

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number = 3000;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string = "http://localhost";

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string = "http://localhost";

  @IsString()
  @IsOptional()
  API_PREFIX: string = "api";

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string = "en";

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string = "x-custom-lang";

  // Google
  @IsString()
  @IsOptional()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  GOOGLE_CLIENT_SECRET: string;

  // Database
  @IsString()
  @IsOptional()
  DATABASE_URL: string;
}

export type AppConfig = {
  nodeEnv: Environment;
  appName: string;
  pwd: string;
  domainFront: string;
  domainBack: string;
  appPort: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;

  googleClientId: string;
  googleClientSecret: string;

  databaseUrl: string;
};

export default registerAs<AppConfig>("app", () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: config.NODE_ENV,

    appName: config.APP_NAME,
    appPort: config.APP_PORT,

    apiPrefix: config.API_PREFIX,

    domainFront: config.FRONTEND_DOMAIN,
    domainBack: config.BACKEND_DOMAIN,

    fallbackLanguage: config.APP_FALLBACK_LANGUAGE,
    headerLanguage: config.APP_HEADER_LANGUAGE,

    pwd: process.env.PWD || process.cwd(),

    googleClientId: config.GOOGLE_CLIENT_ID,
    googleClientSecret: config.GOOGLE_CLIENT_SECRET,

    databaseUrl: config.DATABASE_URL,
  };
});
