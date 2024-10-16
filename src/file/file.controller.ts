import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('file')
@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File uploaded successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request - Invalid file or parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error - Error during file upload',
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.fileService.uploadFile(file);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(
        `Error uploading file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('large-file')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 500 * 1024 * 1024 } }),
  )
  @ApiOperation({ summary: 'Upload a large file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Large file uploaded successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request - Invalid file or parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error - Error during large file upload',
  })
  @ApiConsumes('multipart/form-data')
  async uploadLargeFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.fileService.uploadLargeFile(file);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(
        `Error uploading large file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
