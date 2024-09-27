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
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: IUser): IUser {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<IUser>,
  ): IUser {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.remove(id);
  }

  @Get()
  findAll(): IUser[] {
    return this.usersService.findAll();
  }
}
