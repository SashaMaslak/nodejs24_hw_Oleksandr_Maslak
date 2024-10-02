import { IsString, IsEmail, MinLength } from 'class-validator';
import { IUser } from 'src/users/interfaces/user.interface';
import { IUserSignIn } from '../interfaces/auth-user.interface';

export class AuthSignInDto implements IUserSignIn {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
