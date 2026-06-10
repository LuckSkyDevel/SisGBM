/* eslint-disable prettier/prettier */

import { Perfil } from "src/perfil/domain/perfil.enum";

/* eslint-disable @typescript-eslint/no-unused-vars */
export class UserEntity {

  constructor(
    public readonly codUsuario: string,
    public readonly nomUsuario: string,
    public readonly desEmail: string,
    public readonly desSenha: string,
    public readonly datCriacao: Date,
    public readonly datAtualizacao: Date | null,
    public readonly perfis: Perfil[],
    public readonly refreshToken?: string | null,
  ) {}

toPublic() {
    const { desSenha, refreshToken, ...publicData } = this;
    return publicData;
  }
}
