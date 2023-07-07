import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreatePrestamoDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identificacion: string;
}
