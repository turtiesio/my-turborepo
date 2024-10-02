import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { LinksModule } from "@/links/links.module";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { CatsModule } from "@/cats/cats.module";
import { ulid } from "ulid";

@Module({
  imports: [
    LinksModule,
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
        //
        // TODO: implement reqId from client side. Extract from headers. e.g. X-Request-ID
        genReqId: () => ulid(),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
