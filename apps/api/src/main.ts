import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
