import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger'; // Імпорт декораторів
//import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { User } from 'src/database-abstraction/models/user.model';
import { GetUsersResponseDto } from './dto/get-users-response.dto'; // Імпортуйте відповідні DTO
import { ErrorModelDto } from 'src/common/dto/error-model.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // @ApiOkResponse({
  //   type: GetUsersResponseDto, // Змінити тип відповіді
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorModelDto,
  // })
  // async getAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // @ApiOkResponse({
  //   type: User, // Вказати тип відповіді
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorModelDto,
  // })
  // async getById(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findById(id);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Put(':id')
  // @ApiOkResponse({
  //   type: User, // Вказати тип відповіді
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorModelDto,
  // })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.usersService.findByIdAndReplace(id, updateUserDto);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Patch(':id')
  // @ApiOkResponse({
  //   type: User, // Вказати тип відповіді
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorModelDto,
  // })
  // async partialUpdate(
  //   @Param('id') id: string,
  //   @Body() partialUpdateUserDto: PartialUpdateUserDto,
  // ): Promise<User> {
  //   return this.usersService.findByIdAndUpdate(id, partialUpdateUserDto);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Delete(':id')
  // @ApiResponse({
  //   status: HttpStatus.NO_CONTENT, // Вказати, що ресурс видалено
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorModelDto,
  // })
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.usersService.remove(id);
  // }
}
