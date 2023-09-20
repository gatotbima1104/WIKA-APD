// file.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Implement file upload logic here, e.g., saving the file to a storage location
    // Return the file path or filename once uploaded
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Replace this example with actual file upload code
    // You can use libraries like multer-s3 for AWS S3 uploads or save to a local directory
    const filePath = 'path/to/uploaded/file.jpg';

    return filePath;
  }
}
