import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream, writeFile, existsSync, mkdirSync } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadDir = './src/file/uploads';
  private readonly largeUploadDir = './src/file/uploads/large-files';

  constructor() {
    this.createDirIfNotExists(this.uploadDir);
    this.createDirIfNotExists(this.largeUploadDir);
  }

  private createDirIfNotExists(dir: string) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const filePath = `${this.uploadDir}/${Date.now()}-${file.originalname}`;
    console.log('Uploading file to:', filePath);

    try {
      await new Promise<void>((resolve, reject) => {
        writeFile(filePath, file.buffer, (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return reject(
              new HttpException(
                `Upload failed: ${err.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          resolve();
        });
      });

      return { message: 'File uploaded successfully', path: filePath };
    } catch (error) {
      console.error('Error in uploadFile:', error);
      throw new HttpException(
        `Error uploading file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadLargeFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    if (!existsSync(this.largeUploadDir)) {
      mkdirSync(this.largeUploadDir);
    }

    const filePath = `${this.largeUploadDir}/${Date.now()}-${
      file.originalname
    }`;

    try {
      const writeStream = createWriteStream(filePath);

      return new Promise((resolve, reject) => {
        writeStream.write(file.buffer, (err) => {
          if (err) {
            return reject(
              new HttpException(
                `Upload failed: ${err.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
        });

        writeStream.on('finish', () => {
          resolve({
            message: 'Large file uploaded successfully',
            path: filePath,
          });
        });

        writeStream.on('error', (error) => {
          reject(
            new HttpException(
              `Upload failed: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });

        writeStream.end();
      });
    } catch (error) {
      throw new HttpException(
        `Error uploading file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
