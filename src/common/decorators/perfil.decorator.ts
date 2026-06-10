import { SetMetadata } from '@nestjs/common';
import { Perfil } from 'src/perfil/domain/perfil.enum';

export const PERFIS_KEY = 'perfis';
export const Perfis = (...perfis: Perfil[]) => SetMetadata(PERFIS_KEY, perfis);
