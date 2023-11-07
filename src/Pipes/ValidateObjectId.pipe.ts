import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidator implements PipeTransform {
  transform(value: any) {
    if (isValidObjectId(value)) {
      return value;
    }
    throw new HttpException('Object Id Invalido', HttpStatus.BAD_REQUEST);
  }
}
