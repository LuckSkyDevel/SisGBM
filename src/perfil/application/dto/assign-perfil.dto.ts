import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';
import { Perfil } from 'src/perfil/domain/perfil.enum';

export class AssignPerfilDto {
  @ApiProperty({
    description: 'O código do usuário ao qual o perfil será atribuído.',
    example: '123',
  })
  @IsNumberString()
  codUsuario!: string;

  @ApiProperty({
    description: 'O nome do perfil a ser atribuído ao usuário.',
    enum: Perfil,
    example: 'ADMIN',
  })
  @IsEnum(Perfil, {
    message: `O perfil deve ser um valor válido: ${Object.values(Perfil).join(', ')}.`,
  })
  nomPerfil!: string;
}
