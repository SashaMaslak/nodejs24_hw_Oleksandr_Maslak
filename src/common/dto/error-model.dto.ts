import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

class IMessageKeyError {
  @ApiProperty()
  @IsString()
  messageKey: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  property: string;
}

export class ErrorModelDto {
  @ApiProperty({ type: IMessageKeyError, isArray: true })
  errors: IMessageKeyError[];

  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsDate()
  timestamp: Date;

  @ApiProperty()
  @IsString()
  path: string;
}
