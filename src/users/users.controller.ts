import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { User } from 'src/database-abstraction/models/user.model';
import { UserDto } from './dto/user.dto';
import { GetPaginatedList } from 'src/common/dto/get-paginated-list.dto';
import { ErrorModelDto } from 'src/common/dto/error-model.dto';
import { PaginationResponse } from 'src/common/dto/pagination-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: PaginationResponse<User>,
    description: 'List of users successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
    description: 'Error during the request',
  })
  async getAll(
    @Query() paginationParams: GetPaginatedList,
  ): Promise<PaginationResponse<User>> {
    const users = await this.usersService.findAll(paginationParams);
    const total = await this.usersService.count();

    return {
      data: users,
      skip: paginationParams.skip,
      total: total,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({
    type: UserDto,
    description: 'User successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
    description: 'Invalid request or user not found',
  })
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    type: User,
    description: 'User successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
    description: 'Data error or invalid request',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.findByIdAndReplace(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Partial update user' })
  @ApiOkResponse({
    type: User,
    description: 'User successfully partially updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
    description: 'Data error or invalid request',
  })
  async partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<User> {
    return this.usersService.findByIdAndUpdate(id, partialUpdateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
    description: 'Error during deletion or user not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
