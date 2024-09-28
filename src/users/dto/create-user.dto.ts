import { IsBoolean, IsInt, IsString, Min, Max, Length } from 'class-validator';
import { ICreateUser } from '../interfaces/create-user.interface';

export class CreateUserDto implements ICreateUser {
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
