import {
  IsString,
  IsEmail,
  MinLength,
  Length,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { IUser } from 'src/users/interfaces/user.interface';
import { IUserSignUp } from '../interfaces/auth-user.interface';

export class AuthSignUpDto implements IUserSignUp {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsBoolean()
  isStudent: boolean;
}
