import { Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UserService {
  private users: IUser[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto): IUser {
    const newUser = { id: this.idCounter++, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): IUser {
    const existingUserIndex = this.users.findIndex((user) => user.id === id);
    if (existingUserIndex !== -1) {
      const updatedUser = { id, ...updateUserDto };
      this.users[existingUserIndex] = updatedUser;
      return updatedUser;
    }
    return null;
  }

  partialUpdate(id: number, partialUpdateUserDto: PartialUpdateUserDto): IUser {
    const existingUser = this.findOne(id);
    if (existingUser) {
      Object.assign(existingUser, partialUpdateUserDto);
      return existingUser;
    }
    return null;
  }

  remove(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
