import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ulid } from "ulidx";
import { ConfigModule } from "@nestjs/config";
import appConfig from "@/config/app.config";
import databaseConfig from "@/database/config/database.config";
import { DatabaseConfigService } from "@/database/database.config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: [process.cwd() + "/../../.env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== "production" ? "debug" : "info",
        transport:
          process.env.NODE_ENV !== "production"
            ? { target: "pino-pretty" }
            : undefined,
        quietReqLogger: true,
        quietResLogger: true,
        // TODO: implement reqId from client side. Extract from headers. e.g. X-Request-ID
        genReqId: () => ulid(),
      },
    }),
  ],
})
export class AppModule {}
