/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as perfilRepository from "../domain/perfil.repository";

@Injectable()
export class RemovePerfilUseCase {
  constructor(
    @Inject(perfilRepository.PERFIL_REPOSITORY)
    private readonly perfilRepository: perfilRepository.IPerfilRepository,
  ) {}

  async execute(codUsuario: string, codPerfil: number) {
    const existing = await this.perfilRepository.isAssigned(codUsuario, codPerfil);

    if (!existing)
      throw new NotFoundException('Usuário não possui esse perfil');

    return this.perfilRepository.removeFromUser(codUsuario, codPerfil);
  }
}