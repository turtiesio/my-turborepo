import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { Logger as PinoLogger, LoggerErrorInterceptor } from "nestjs-pino";
import helmet from "helmet";
import compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));

  app.use(helmet());
  app.use(compression());
  app.enableVersioning();

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Reference: https://github.dev/Ferdysd96/nestjs-permission-boilerplate
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new HttpResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe());

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
