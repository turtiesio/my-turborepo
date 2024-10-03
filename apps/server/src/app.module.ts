import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { CatsModule } from "@/cats/cats.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "@/user/entities/user.entity";
import { ulid } from "ulidx";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [User],
      synchronize: process.env.NODE_ENV !== "production",
      // entities: [__dirname + "/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
    }),
    UserModule,
    CatsModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
