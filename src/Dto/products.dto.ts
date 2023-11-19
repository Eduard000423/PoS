import { ApiProperty } from '@nestjs/swagger';

export class productDTO {
  //_id?: ObjectId;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  prize: number;
  @ApiProperty()
  category: string;
}
