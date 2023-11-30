import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { UsersDto } from 'src/Dto/users.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidateUser implements PipeTransform {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: UsersDto, metadata: ArgumentMetadata) {
    const object = plainToInstance(UsersDto, value);
    const err = await validate(object);
    if (err.length > 0) {
      throw new BadRequestException(`Error en la Validacion: ${err}`);
    }

    return value;
  }
}
