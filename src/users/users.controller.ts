import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
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

  @Post()
  create(@Body() createUserDto: CreateUserDto): IUser {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(): IUser[] {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number): IUser {
  //   return this.usersService.findById(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): IUser {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Patch(':id')
  // partialUpdate(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() partialUpdateUserDto: PartialUpdateUserDto,
  // ): IUser {
  //   return this.usersService.partialUpdate(id, partialUpdateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number): void {
  //   this.usersService.remove(id);
  // }
}
