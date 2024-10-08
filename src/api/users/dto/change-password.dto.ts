import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(6, 20)
  newPassword: string;
}
