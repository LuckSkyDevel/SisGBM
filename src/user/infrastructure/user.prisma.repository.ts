/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaService } from 'src/db/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { Injectable } from '@nestjs/common';
import { Perfil } from 'src/perfil/domain/perfil.enum';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  private toEntity(user: any): UserEntity {
    return new UserEntity(
      String(user.codUsuario),
      user.nomUsuario,
      user.desEmail,
      user.desSenha,
      user.datCriacao,
      user.datAtualizacao,
      user.perfis ? user.perfis.map((p) => p.perfil.nomPerfil as Perfil) : [],
      user.refreshToken,
    );
  }

  async create(nomeUsuario: string, email: string, senha: string): Promise<Omit<UserEntity, 'desSenha' | 'refreshToken'>> {
    const newUser = await this.prismaService.usuario.create({
      data: {
        nomUsuario: nomeUsuario,
        desEmail: email,
        desSenha: senha,
        datCriacao: new Date(),
        datAtualizacao: new Date(),
      },
    });

    return this.toEntity(newUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.usuario.findFirst({
      where: { desEmail: email },
      include: {
        perfis: {
          include: {
            perfil: true
          }
        }
      }
    });

    return user ? this.toEntity(user) : null;
  }

  async findById(codUser: bigint): Promise<UserEntity | null> {
    const user = await this.prismaService.usuario.findUnique({
      where: { codUsuario: codUser },
      include: {
        perfis: {
          include: {
            perfil: true
          }
        }
      }
    });

    return user ? this.toEntity(user) : null;
  }

  async updateRefreshToken(codUser: bigint, refreshToken: string | null): Promise<void> {
    await this.prismaService.usuario.update({
      where: { codUsuario: codUser },
      data: { refreshToken },
    });
  }
}
