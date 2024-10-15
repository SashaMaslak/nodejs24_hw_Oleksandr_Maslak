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

@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
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
