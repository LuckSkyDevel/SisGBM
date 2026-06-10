import { Perfil } from './perfil.enum';

export interface IPerfilRepository {
  findAll(): Promise<{ perfis: Perfil[] }>;

  findByName(
    nomPerfil: string,
  ): Promise<{ codPerfil: number; nomPerfil: string } | null>;

  create(nomPerfil: string): Promise<{ codPerfil: number; nomPerfil: string }>;

  isAssigned(codUsuario: string, codPerfil: number): Promise<boolean>;

  assignToUser(codUsuario: string, codPerfil: number): Promise<void>;

  removeFromUser(codUsuario: string, codPerfil: number): Promise<void>;
}

export const PERFIL_REPOSITORY = Symbol('IPerfilRepository');
