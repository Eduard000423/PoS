import {
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MassiveService } from './massive.service';

@Controller('massive')
export class MassiveController {
  constructor(private readonly massiveService: MassiveService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async massiveLoadUp(
    @UploadedFile() /* new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'xlsx' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),*/
    file: Express.Multer.File,
  ) {
    const response = await this.massiveService.massive(file.filename);
    if (response?.error) {
      throw new HttpException(response.error, response.status);
    }
    return response;
  }
}
