import { ApiProperty } from '@nestjs/swagger';
import { privilegioDto } from './privilegio.dto';
import {
  Max,
  ValidateNested,
  IsIn,
  IsString,
  Min,
  IsNumber,
  IsInt,
  IsPositive,
} from '@nestjs/class-validator';

const ROLES: string[] = ['SuperAdmin', 'Admin', 'Moderador', 'Cliente'];
const GENDERS: string[] = ['Male', 'Female'];

export class UsersDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  edad: number;

  @ApiProperty()
  @IsString()
  @IsIn(GENDERS)
  gender: string;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  pass: string;

  @ValidateNested()
  privilegios?: privilegioDto;

  @ApiProperty({ enum: ROLES })
  @IsString()
  @IsIn(ROLES)
  rol: string;
}
