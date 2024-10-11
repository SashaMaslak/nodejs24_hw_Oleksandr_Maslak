import { IsString, Length } from 'class-validator';
import { GetPaginatedList } from 'src/common/dto/get-paginated-list.dto';

export class GetResidentsRequestDto extends GetPaginatedList {
  @IsString()
  @Length(1, 200)
  city: string;
}
