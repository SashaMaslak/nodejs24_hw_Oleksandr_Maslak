import { IsString, MinLength } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class GetUserDto implements Pick<IUser, 'id'> {
  @IsString()
  id: string;
}
