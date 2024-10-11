import { PaginationResponse } from 'src/common/dto/pagination-response.dto';
import { IResidentsData } from '../interfaces/residents-data.interface';

export class GetResidentsResponseDto extends PaginationResponse<IResidentsData> {}
