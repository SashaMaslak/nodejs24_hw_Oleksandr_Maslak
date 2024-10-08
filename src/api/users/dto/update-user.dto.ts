import {
  IsBoolean,
  IsInt,
  IsString,
  Min,
  Max,
  Length,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UpdateUserDto implements Omit<IUser, 'id' | 'password'> {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsBoolean()
  isStudent: boolean;
}
