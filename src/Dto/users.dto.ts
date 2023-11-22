import { ApiProperty } from '@nestjs/swagger';
import { privilegioDto } from './privilegio.dto';
import { ValidateNested } from '@nestjs/class-validator';
import { IsInt, IsString } from 'class-validator';

export class UsersDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  edad: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  pass: string;

  @ValidateNested()
  privilegios?: privilegioDto;

  @ApiProperty({ enum: ['SuperAdmin', 'Admin', 'Moderador', 'Cliente'] })
  @IsString()
  rol: string;
}
