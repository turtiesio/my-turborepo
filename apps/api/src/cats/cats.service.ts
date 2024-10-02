import { Injectable, Logger } from "@nestjs/common";
import { Cat } from "@/cats/entities/cat.entity";
import { CreateCatDto } from "@/cats/dto/create-cat.dto";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  private readonly cats: Cat[] = [];

  create(dto: CreateCatDto) {
    this.cats.push(Cat.from(dto));
  }

  findAll() {
    return this.cats;
  }
}
