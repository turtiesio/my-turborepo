import { CreateCatDto } from "@/cats/dto/create-cat.dto";

export class Cat {
  constructor(
    private name: string,
    private age: number,
    private breed: string,
  ) {}

  get Name() {
    return this.name;
  }

  get Age() {
    return this.age;
  }

  get Breed() {
    return this.breed;
  }

  static from(dto: CreateCatDto) {
    return new Cat(dto.name, dto.age, dto.breed);
  }
}
