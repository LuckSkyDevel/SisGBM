/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { Perfil } from 'src/perfil/domain/perfil.enum';

export class CreatePerfilDto {
  @IsEnum(Perfil, {
        message: `O perfil deve ser um valor válido: ${Object.values(Perfil).join(', ')}.`,
    })
    nomPerfil!: Perfil;
}
