/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import * as perfilRepository from '../domain/perfil.repository';
import { CreatePerfilDto } from './dto/create-perfil.dto';

@Injectable()
export class CreatePerfilUseCase {
  constructor(
    @Inject(perfilRepository.PERFIL_REPOSITORY)
    private readonly perfilRepository: perfilRepository.IPerfilRepository,
  ) {}

  async execute(dto: CreatePerfilDto): Promise<{ codPerfil: number; nomPerfil: string }> {
    const { nomPerfil } = dto;

    const existingPerfil = await this.perfilRepository.findByName(nomPerfil);

    if (existingPerfil) {
      throw new Error(`O perfil "${nomPerfil}" já existe.`);
    }

    return this.perfilRepository.create(nomPerfil);
  }
}
