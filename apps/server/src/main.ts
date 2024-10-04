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
import { ValidationPipe, VersioningType } from "@nestjs/common";
import cookieParser from "cookie-parser";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));

  // const configService = app.get(ConfigService<AllConfigType>);
  // console.log(configService.get("app.apiPrefix", { infer: true }));

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser("secret"));
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      //TODO: Replace this with config service
      disableErrorMessages: process.env.NODE_ENV === "production",
    }),
  );

  // Reference: https://github.dev/Ferdysd96/nestjs-permission-boilerplate
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new HttpResponseInterceptor());

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
