import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  Length,
} from 'class-validator';
import { IPartUpdateUser } from '../interfaces/partial-update-user.interface';

export class PartialUpdateUserDto implements IPartUpdateUser {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  lastName?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;
}
