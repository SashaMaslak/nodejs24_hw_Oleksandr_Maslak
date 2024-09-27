import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): User {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<User>,
  ): User {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.remove(id);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }
}
