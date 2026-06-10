/* eslint-disable prettier/prettier */
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as perfilRepository from '../domain/perfil.repository';
import * as userRepository from 'src/user/domain/user.repository';

@Injectable()
export class AssignPerfilUseCase {
  constructor(
    @Inject(userRepository.USER_REPOSITORY)
    private readonly userRepo: userRepository.IUserRepository,
    @Inject(perfilRepository.PERFIL_REPOSITORY)
    private readonly perfilRepo: perfilRepository.IPerfilRepository,
  ) {}

  async execute(codUsuario: string, nomPerfil: string): Promise<void> {
    const user = await this.userRepo.findById(BigInt(codUsuario));
    
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const perfil = await this.perfilRepo.findByName(nomPerfil);

    if (!perfil) {
      throw new NotFoundException('Perfil não encontrado');
    }

    const alreadyAssigned = await this.perfilRepo.isAssigned(codUsuario, perfil.codPerfil);

    if (alreadyAssigned) {
      throw new ConflictException('Perfil já atribuído ao usuário');
    }

    return this.perfilRepo.assignToUser(codUsuario, perfil.codPerfil);
  }
}
