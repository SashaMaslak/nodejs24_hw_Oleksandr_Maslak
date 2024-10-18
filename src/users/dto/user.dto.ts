import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsBoolean,
  MinLength,
  Length,
} from 'class-validator';

export class UserDto implements Omit<IUser, 'id'> {
  @ApiProperty({ description: "User's first name" })
  @IsString()
  @Length(2, 30)
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  @IsString()
  @Length(2, 30)
  lastName: string;

  @ApiProperty({ description: "User's email address", uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "User's age", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiProperty({ description: 'Is the user a student', required: false })
  @IsBoolean()
  isStudent: boolean;

  @ApiProperty({ description: 'Refresh token', required: false })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty({ description: 'Access token', required: false })
  @IsOptional()
  @IsString()
  accessToken?: string;
}
