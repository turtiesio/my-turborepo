import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserSchema } from "@/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "@/user/dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepo: Repository<UserSchema>,
  ) {}

  async findOne(id: string) {
    return new User(await this.userRepo.findOneBy({ _id: id }));
  }

  async findByEmail(email: string) {
    return new User(await this.userRepo.findOneBy({ _email: email }));
  }

  async findAll(): Promise<User[]> {
    return (await this.userRepo.find()).map((user) => new User(user));
  }

  async create(dto: CreateUserDto) {
    const user = await dto.toEntity();
    return new User(await this.userRepo.save(user.toSchema()));
  }

  async save(user: User) {
    return new User(await this.userRepo.save(user.toSchema()));
  }

  async delete(user: User) {
    return this.userRepo.delete(user.toSchema());
  }
}
