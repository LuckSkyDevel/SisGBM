import { IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class GerarEscalaDto {
  @IsNumber()
  qtdHoursDay!: number;

  @IsString()
  initialHourDay!: string;

  @IsNumber()
  qtdHoursNigth!: number;

  @IsString()
  initialHourNigth!: string;

  @IsNumber()
  qtdMilitaryDay!: number;

  @IsNumber()
  qtdMilitaryNigth!: number;

  @IsString()
  lastMilitaryName!: string;

  @IsArray()
  @ArrayMinSize(2, { message: 'Informe ao menos 2 nomes' })
  @IsString({ each: true })
  allMilitariesName!: string[];
}
