import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserLogout } from '../interfaces/auth-logout.interface';

export class AuthLogoutDto implements IUserLogout {
  @ApiProperty({
    description: "User's ID",
    example: '605c72f1b4699b2e7f33b222',
    minLength: 24,
    maxLength: 24,
  })
  @IsString()
  @Length(24)
  id: string;
}
