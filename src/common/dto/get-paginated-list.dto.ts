import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, Max, Min } from 'class-validator';

export class GetPaginatedList {
  @IsOptional()
  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @ApiPropertyOptional({ default: 0 })
  skip = 0;

  @IsOptional()
  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @Min(1)
  @Max(50)
  @ApiPropertyOptional({ default: 20, maximum: 50 })
  take = 20;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetPaginatedListWithParams<T extends GetPaginatedList> {
  @IsOptional()
  @ApiProperty()
  parameters: T;
}
