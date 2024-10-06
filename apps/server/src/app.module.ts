import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ulid } from "ulidx";
import { ConfigModule } from "@nestjs/config";
import appConfig from "@/config/app.config";
import { DatabaseConfigService } from "@/database/database.config.service";
import { AuthGoogleModule } from "./auth-google/auth-google.module";
import { UserOauthService } from "./user-oauth/user-oauth.service";
import { UserOauthModule } from "./user-oauth/user-oauth.module";
import { AuthModule } from "@/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: [process.cwd() + "/../../.env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
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
    AuthModule,
    UserModule,
    AuthGoogleModule,
    UserOauthModule,
  ],
})
export class AppModule {}
