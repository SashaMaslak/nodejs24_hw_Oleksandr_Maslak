import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  private initialUser: CreateUserDto = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: 0,
    isStudent: false,
  };

  create(dto: CreateUserDto): IUser {
    const newUser = { id: uuidv4(), ...this.initialUser, ...dto };

    this.users.push(newUser);
    return newUser;
  }

  remove(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  findAll(): IUser[] {
    return this.users;
  }

  findById(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): IUser {
    return this.users.find((user) => user.email === email);
  }

  findByIdAndReplace(id: string, dto: UpdateUserDto): IUser {
    const existingUserIndex = this.users.findIndex((user) => user.id === id);
    if (!existingUserIndex) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return (this.users[existingUserIndex] = dto);
  }

  findByIdAndUpdate(id: string, dto: PartialUpdateUserDto): IUser {
    const existingUserIndex = this.users.findIndex((user) => user.id === id);
    if (!existingUserIndex) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const foundUser = this.users[existingUserIndex];
    return (this.users[existingUserIndex] = { ...foundUser, ...dto });
  }
}
