import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsString,
  Min,
  Max,
  Length,
  IsEmail,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UpdateUserDto implements Omit<IUser, 'id' | 'password'> {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's first name",
    minLength: 2,
    maxLength: 30,
    example: 'John',
  })
  @IsString()
  @Length(2, 30)
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    minLength: 2,
    maxLength: 30,
    example: 'Doe',
  })
  @IsString()
  @Length(2, 30)
  lastName: string;

  @ApiProperty({
    description: "User's age",
    minimum: 0,
    maximum: 120,
    example: 25,
  })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @ApiProperty({
    description: 'Indicates whether the user is a student',
    example: true,
  })
  @IsBoolean()
  isStudent: boolean;
}
