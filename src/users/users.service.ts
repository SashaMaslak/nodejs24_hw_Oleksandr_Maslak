import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  create(dto: CreateUserDto): IUser {
    const newUser = { id: uuidv4(), ...dto };

    this.users.push(newUser);
    return newUser;
  }

  // findAll(): IUser[] {
  //   return this.users;
  // }

  // findById(id: number): IUser {
  //   return this.users.find((user) => user.id === id);
  // }

  // update(id: number, updateUserDto: UpdateUserDto): IUser {
  //   const existingUserIndex = this.users.findIndex((user) => user.id === id);
  //   if (existingUserIndex !== -1) {
  //     const updatedUser = { id, ...updateUserDto };
  //     this.users[existingUserIndex] = updatedUser;
  //     return updatedUser;
  //   }
  //   return null;
  // }

  // partialUpdate(id: number, partialUpdateUserDto: PartialUpdateUserDto): IUser {
  //   const existingUser = this.findById(id);
  //   if (existingUser) {
  //     Object.assign(existingUser, partialUpdateUserDto);
  //     return existingUser;
  //   }
  //   return null;
  // }

  // remove(id: number): void {
  //   this.users = this.users.filter((user) => user.id !== id);
  // }
}
