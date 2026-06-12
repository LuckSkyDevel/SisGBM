import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Perfil } from 'src/perfil/domain/perfil.enum';

export class CreatePerfilDto {
  @ApiProperty({
    description: 'Nome do perfil a ser criado',
    enum: Perfil,
    example: Perfil.ADMIN,
  })
  @IsEnum(Perfil, {
    message: `O perfil deve ser um valor válido: ${Object.values(Perfil).join(', ')}.`,
  })
  nomPerfil!: Perfil;
}
