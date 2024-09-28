import { IsNumber, Length } from 'class-validator';
import { IGetUser } from '../interfaces/get-user.interface';

export class GetUserInput implements IGetUser {
  @IsNumber()
  @Length(0, 6)
  id: number;
}
