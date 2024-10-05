import { IsString, IsEmail, MinLength } from 'class-validator';
import { IUserSignIn } from '../interfaces/auth-signin.interface';

export class AuthSignInDto implements IUserSignIn {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
