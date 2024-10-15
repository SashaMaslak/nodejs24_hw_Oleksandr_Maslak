import { PaginationResponse } from '../../common/dto/pagination-response.dto';
import { IUsersData } from '../interfaces/users-data.interface';

export class GetUsersResponseDto extends PaginationResponse<IUsersData> {}
