import { IsBoolean, IsInt, IsString, Min, Max, Length } from 'class-validator';
import { IUpdateUser } from '../interface/update-user.interface';

export class UpdateUserDto implements IUpdateUser {
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
