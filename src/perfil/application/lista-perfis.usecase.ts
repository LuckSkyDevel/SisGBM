import { Inject, Injectable } from '@nestjs/common';
import * as perfilRepository from '../domain/perfil.repository';
import { Perfil } from '../domain/perfil.enum';

@Injectable()
export class ListaPerfisUseCase {
  constructor(
    @Inject(perfilRepository.PERFIL_REPOSITORY)
    private readonly perfilRepository: perfilRepository.IPerfilRepository,
  ) {}

  async execute(): Promise<Perfil[]> {
    const perfis = await this.perfilRepository.findAll();

    return perfis.perfis;
  }
}
