import { IsString, Length } from 'class-validator';
import { IUserLogout } from '../interfaces/auth-logout.interface';

export class AuthLogoutDto implements IUserLogout {
  @IsString()
  @Length(24)
  id: string;
}
