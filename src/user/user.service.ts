import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindManyOptions, FindOneOptions, Not, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, middleName, password, username, role } =
      createUserDto;

    const usernameExists = await this.userRepo.exists({
      where: { username },
    });
    if (usernameExists)
      throw new NotAcceptableException("Username is already exists");

    const emailExists = await this.userRepo.exists({
      where: { email },
    });
    if (emailExists)
      throw new NotAcceptableException("Email is already exists");

    const user = this.userRepo.create({
      email,
      firstName,
      lastName,
      middleName,
      password,
      username,
      role,
    });
    return this.userRepo.save(user);
  }

  findAll(options?: FindManyOptions<User>) {
    return this.userRepo.find(options);
  }

  findOne(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }

  async findExistingOne(options: FindOneOptions<User>) {
    const user = await this.findOne(options);
    if (!user) throw new NotFoundException("User is not found.");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, firstName, lastName, middleName, username } = updateUserDto;
    const user = await this.findExistingOne({ where: { id } });
    if (username && username !== user.username) {
      const usernameExists = await this.userRepo.exists({
        where: { username, id: Not(id) },
      });
      if (usernameExists)
        throw new NotFoundException(
          "Username already exists. Please choose another one."
        );
      user.username = username;
    }
    if (email && email !== user.email) {
      const emailExists = await this.userRepo.exists({
        where: { email, id: Not(id) },
      });
      if (emailExists)
        throw new NotFoundException(
          "emial already exists. Please choose another one."
        );
      user.email = email;
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (middleName) user.middleName = middleName;
    return this.userRepo.save(user);
  }

  async toggleActivation(id: string, isActive: boolean) {
    const user = await this.findExistingOne({ where: { id } });
    user.isActive = isActive;
    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findExistingOne({ where: { id } });
    return this.userRepo.remove(user);
  }
}
