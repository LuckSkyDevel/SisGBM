import { Controller, Post, Body } from '@nestjs/common';
import { GerarEscalaDto } from '../application/dto/gerar-escala.dto';
import { GerarEscalaUseCase } from '../application/gerar-escala.usecase';

@Controller('escala')
export class EscalaController {
  constructor(private readonly gerarEscalaUseCase: GerarEscalaUseCase) {}

  @Post('gerar')
  gerar(@Body() dto: GerarEscalaDto) {
    return {
      escala: this.gerarEscalaUseCase.execute(dto),
    };
  }
}
