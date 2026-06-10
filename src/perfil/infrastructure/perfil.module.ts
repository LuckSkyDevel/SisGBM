import { Module } from '@nestjs/common';
import { PerfilPrismaRepository } from './perfil.prisma.repository';
import { PERFIL_REPOSITORY } from '../domain/perfil.repository';
import { PerfilController } from './perfil.controller';
import { ListaPerfisUseCase } from '../application/lista-perfis.usecase';
import { AssignPerfilUseCase } from '../application/assign-perfil.usecase';
import { CreatePerfilUseCase } from '../application/create-perfil.usecase';
import { RemovePerfilUseCase } from '../application/remove-perfil.usecase';
import { UsersModule } from 'src/user/infrastructure/users.module';
import { USER_REPOSITORY } from 'src/user/domain/user.repository';
import { UserPrismaRepository } from 'src/user/infrastructure/user.prisma.repository';

@Module({
  imports: [UsersModule],
  controllers: [PerfilController],
  providers: [
    ListaPerfisUseCase,
    AssignPerfilUseCase,
    CreatePerfilUseCase,
    RemovePerfilUseCase,
    {
      provide: PERFIL_REPOSITORY,
      useClass: PerfilPrismaRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [
    ListaPerfisUseCase,
    AssignPerfilUseCase,
    CreatePerfilUseCase,
    RemovePerfilUseCase,
  ],
})
export class PerfilModule {}
