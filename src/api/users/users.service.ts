import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

let users: IUser[] = [];

@Injectable()
export class UsersService {
  create(dto: CreateUserDto): IUser {
    const newUser = { id: uuidv4(), ...dto };

    users.push(newUser);

    return newUser;
  }

  remove(id: string) {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    users = users.filter((user) => user.id !== id);

    return user;
  }

  findAll(): IUser[] {
    return users;
  }

  findById(id: string): IUser {
    return users.find((user) => user.id === id);
  }

  findByEmail(email: string): IUser {
    return users.find((user) => user.email === email);
  }

  findByIdAndReplace(id: string, dto: UpdateUserDto): IUser {
    const existingUserIndex = users.findIndex((user) => user.id === id);
    if (!existingUserIndex) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return (users[existingUserIndex] = dto);
  }

  findByIdAndUpdate(id: string, dto: PartialUpdateUserDto): IUser {
    const existingUserIndex = users.findIndex((user) => user.id === id);
    if (!existingUserIndex) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const foundUser = users[existingUserIndex];
    return (users[existingUserIndex] = { ...foundUser, ...dto });
  }
}
