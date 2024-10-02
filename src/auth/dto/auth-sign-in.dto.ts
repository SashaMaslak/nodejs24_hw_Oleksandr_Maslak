import { IsString, IsEmail, MinLength } from 'class-validator';
import { IUser } from 'src/users/interfaces/user.interface';

export class AuthSignInDto implements Pick<IUser, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
