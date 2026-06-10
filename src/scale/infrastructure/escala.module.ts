import { Module } from '@nestjs/common';
import { EscalaController } from './escala.controller';
import { GerarEscalaUseCase } from '../application/gerar-escala.usecase';

@Module({
  controllers: [EscalaController],
  providers: [GerarEscalaUseCase],
})
export class EscalaModule {}
