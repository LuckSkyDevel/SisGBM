import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GerarEscalaDto } from '../application/dto/gerar-escala.dto';
import { GerarEscalaUseCase } from '../application/gerar-escala.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Escala')
@Controller('escala')
export class EscalaController {
  constructor(private readonly gerarEscalaUseCase: GerarEscalaUseCase) {}

  @Post('gerar')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully generated.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  gerar(@Body() dto: GerarEscalaDto) {
    return {
      escala: this.gerarEscalaUseCase.execute(dto),
    };
  }
}
