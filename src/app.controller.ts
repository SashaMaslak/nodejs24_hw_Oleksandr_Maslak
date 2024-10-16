import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ping the server to check its status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The server is alive',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'The server encountered an error',
  })
  ping(): { message: string } {
    return { message: 'pong' };
  }
}
