import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  Length,
  IsEmail,
  MinLength,
} from 'class-validator';

export class PartialUpdateUserDto {
  @ApiProperty({
    required: false,
    description: 'User ID',
    minLength: 12,
  })
  @IsOptional()
  @IsString()
  @MinLength(12)
  id?: string;

  @ApiProperty({ required: false, description: 'Email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, description: 'Password', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    required: false,
    description: 'First Name',
    minLength: 2,
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  firstName?: string;

  @ApiProperty({
    required: false,
    description: 'Last Name',
    minLength: 2,
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  lastName?: string;

  @ApiProperty({
    required: false,
    description: 'Age',
    minimum: 0,
    maximum: 120,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiProperty({ required: false, description: 'Student Status' })
  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;

  @ApiProperty({ required: false, description: 'Refresh Token' })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty({ required: false, description: 'Access Token' })
  @IsOptional()
  @IsString()
  accessToken?: string;
}
