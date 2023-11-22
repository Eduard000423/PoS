import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class productDTO {
  //_id?: ObjectId;
  @ApiProperty()
  @IsString()
  productName: string;
  @ApiProperty()
  @IsInt()
  prize: number;
  @ApiProperty()
  @IsString()
  category: string;
}
