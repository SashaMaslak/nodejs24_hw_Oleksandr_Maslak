import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UsersService } from './users.service';
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

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): IUser {
    return this.usersService.findByIdAndReplace(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ): IUser {
    return this.usersService.findByIdAndUpdate(id, partialUpdateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.usersService.remove(id);
  }
}
