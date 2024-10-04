import { AllConfigType } from "@/config/config.type";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: "postgres",
      url: this.configService.getOrThrow("app.databaseUrl", { infer: true }),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize:
        this.configService.getOrThrow("app.nodeEnv", { infer: true }) !==
        "production",
    };
  }
}
