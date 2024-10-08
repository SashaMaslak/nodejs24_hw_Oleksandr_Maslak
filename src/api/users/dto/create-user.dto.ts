import {
  IsBoolean,
  IsInt,
  IsString,
  Min,
  Max,
  Length,
  IsEmail,MinLength
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements Omit<IUser, 'id'> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

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
