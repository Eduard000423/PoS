import { privilegioDto } from './privilegio.dto';

export class UsersDto {
  name: string;
  edad: number;
  user: string;
  pass: string;
  privilegios?: privilegioDto;
  rol: string;
}
