import { Module } from "@nestjs/common";

import { LinksModule } from "@/links/links.module";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [LinksModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
