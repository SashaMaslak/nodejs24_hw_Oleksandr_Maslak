import { IsString, MinLength } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class GetUserInput implements Pick<IUser, 'id'> {
  @IsString()
  @MinLength(12)
  id: string;
}
