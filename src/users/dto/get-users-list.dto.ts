import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { User } from 'src/database-abstraction/models/user.model';

export class GetUsersListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  users: User[];
}
