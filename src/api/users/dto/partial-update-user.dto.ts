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

import { IUser } from '../interfaces/user.interface';

export class PartialUpdateUserDto implements Partial<IUser> {
  @IsOptional()
  @IsString()
  @MinLength(12)
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  lastName?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  accessToken?: string;
}
