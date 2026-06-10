/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { IPerfilRepository } from '../domain/perfil.repository';
import { Perfil } from '../domain/perfil.enum';

@Injectable()
export class PerfilPrismaRepository implements IPerfilRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<{ perfis: Perfil[] }> {
    return this.prisma.perfil.findMany().then((perfis) => ({ perfis: perfis.map((p) => p.nomPerfil as Perfil) }));
  }

  findByName(nomPerfil: string) {
    const perfil = this.prisma.perfil.findUnique({ where: { nomPerfil } })
    .then((p) => 
      p ? { 
        codPerfil: Number(p.codPerfil), 
        nomPerfil: p.nomPerfil 
      } : null
    );

    return perfil;
  }

  create(nomPerfil: string): Promise<{ codPerfil: number; nomPerfil: string }> {
    return this.prisma.perfil.create({
      data: { nomPerfil },
    }).then((p) => ({ codPerfil: Number(p.codPerfil), nomPerfil: p.nomPerfil }));
  }

  async isAssigned(codUsuario: string, codPerfil: number): Promise<boolean> {
    const record = await this.prisma.usuarioPerfil.findUnique({
      where: {
        codUsuario_codPerfil: { codUsuario: BigInt(codUsuario), codPerfil },
      },
    });

    return !!record;
  }

  async assignToUser(codUsuario: string, codPerfil: number): Promise<void> {
    await this.prisma.usuarioPerfil.create({
      data: { codUsuario: BigInt(codUsuario), codPerfil },
    });
  }

  async removeFromUser(codUsuario: string, codPerfil: number): Promise<void> {
    await this.prisma.usuarioPerfil.delete({
      where: {
        codUsuario_codPerfil: { codUsuario: BigInt(codUsuario), codPerfil },
      },
    });
  }
}
