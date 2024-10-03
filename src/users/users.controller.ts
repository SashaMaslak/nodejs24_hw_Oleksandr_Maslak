import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): IUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): IUser {
    return this.usersService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): IUser {
    return this.usersService.findByIdAndReplace(id, updateUserDto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ): IUser {
    return this.usersService.findByIdAndUpdate(id, partialUpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.usersService.remove(id);
  }
}
