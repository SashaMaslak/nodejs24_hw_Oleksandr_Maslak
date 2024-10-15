import { IsString, Length } from 'class-validator';
import { GetPaginatedList } from '../../common/dto/get-paginated-list.dto';

export class GetUsersRequestDto extends GetPaginatedList {
  @IsString()
  @Length(1, 200)
  city: string;
}
