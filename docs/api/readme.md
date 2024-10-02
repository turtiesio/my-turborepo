# API

## Swagger

http://localhost:3000/api
http://localhost:3000/api-json

## Logging

usage example:

```
import { Logger } from "@nestjs/common";

export class MyService {
  private readonly logger = new Logger(this.constructor.name);

  doSomething() {
    this.logger.log("Doing something");
  }
}
```
