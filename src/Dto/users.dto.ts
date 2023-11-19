import { ApiProperty } from '@nestjs/swagger';
import { privilegioDto } from './privilegio.dto';

export class UsersDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  edad: number;
  @ApiProperty()
  user: string;
  @ApiProperty()
  pass: string;
  privilegios?: privilegioDto;
  @ApiProperty({ enum: ['SuperAdmin', 'Admin', 'Moderador', 'Cliente'] })
  rol: string;
}
