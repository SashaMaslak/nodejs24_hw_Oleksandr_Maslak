import {
  IsString,
  IsEmail,
  MinLength,
  Length,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserSignUp } from '../interfaces/auth-signup.interface';

export class AuthSignUpDto implements IUserSignUp {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;

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
    required: false,
    minLength: 2,
    maxLength: 30,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  lastName: string;

  @ApiProperty({
    description: "User's age",
    required: false,
    minimum: 0,
    maximum: 120,
    example: 25,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @ApiProperty({
    description: 'Whether the user is a student',
    example: true,
  })
  @IsBoolean()
  isStudent: boolean;
}
