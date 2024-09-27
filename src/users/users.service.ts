import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(user: User): User {
    const newUser = { id: this.idCounter++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, user: Partial<User>): User {
    const existingUser = this.findOne(id);
    if (existingUser) {
      Object.assign(existingUser, user);
      return existingUser;
    }
    return null;
  }

  remove(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
