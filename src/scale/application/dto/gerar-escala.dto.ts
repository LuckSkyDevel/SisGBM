import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class GerarEscalaDto {
  @ApiProperty({ description: 'Quantidade de horas diurnas', example: 8 })
  @IsNumber()
  qtdHoursDay!: number;

  @ApiProperty({
    description: 'Hora inicial do período diurno',
    example: '08:00',
  })
  @IsString()
  initialHourDay!: string;

  @ApiProperty({ description: 'Quantidade de horas noturnas', example: 8 })
  @IsNumber()
  qtdHoursNigth!: number;

  @ApiProperty({
    description: 'Hora inicial do período noturno',
    example: '20:00',
  })
  @IsString()
  initialHourNigth!: string;

  @ApiProperty({ description: 'Quantidade de militares diurnos', example: 5 })
  @IsNumber()
  qtdMilitaryDay!: number;

  @ApiProperty({ description: 'Quantidade de militares noturnos', example: 5 })
  @IsNumber()
  qtdMilitaryNigth!: number;

  @ApiProperty({
    description: 'Último militar da escala',
    example: 'João da Silva',
  })
  @IsString()
  lastMilitaryName!: string;

  @ApiProperty({
    description: 'Lista de todos os militares',
    minLength: 2,
    example: ['João da Silva', 'Maria Oliveira'],
  })
  @IsArray()
  @ArrayMinSize(2, { message: 'Informe ao menos 2 nomes' })
  @IsString({ each: true })
  allMilitariesName!: string[];
}
