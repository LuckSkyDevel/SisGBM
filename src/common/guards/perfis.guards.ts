/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/perfil/domain/perfil.enum';
import { PERFIS_KEY } from '../decorators/perfil.decorator';

@Injectable()
export class PerfisGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPerfis = this.reflector.getAllAndOverride<Perfil[]>(PERFIS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPerfis || requiredPerfis.length === 0) {
      return true; // Se não houver perfis definidos, permite o acesso
    }
    
    const { user } = context.switchToHttp().getRequest();

    if (!user)
      throw new ForbiddenException("Acesso negado: usuário não autenticado.");


    const hasPerfis = requiredPerfis.some((perfil) => user.perfis?.includes(perfil));


    if (!hasPerfis) {
      throw new ForbiddenException("Acesso negado: você não tem permissão para acessar este recurso.");
    }

    return true;
  }
}
