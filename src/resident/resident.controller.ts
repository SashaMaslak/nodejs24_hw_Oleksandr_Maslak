import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { GetResidentsResponseDto } from './dto/get-residents-response.dto';
import { ErrorModelDto } from 'src/common/dto/error-model.dto';
import { GetResidentsRequestDto } from './dto/get-residents-request.dto';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Get('')
  @ApiOkResponse({
    type: GetResidentsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorModelDto,
  })
  async getResidentsData(@Query() dto: GetResidentsRequestDto) {
    return this.residentService.getResidentsData(dto.city, dto.skip, dto.take);
  }
}
