import { IsBoolean } from '@nestjs/class-validator';

export class privilegioDto {
  @IsBoolean()
  lectura: boolean;
  @IsBoolean()
  modificar: boolean;
  @IsBoolean()
  eliminar: boolean;
  @IsBoolean()
  crear: boolean;
}
