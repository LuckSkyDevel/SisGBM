/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { UsersModule } from '../../user/infrastructure/users.module';
import { RegisterUseCase } from '../application/register.usecase';
import { RefreshUseCase } from '../application/refresh.usecase';
import { LoginUseCase } from '../application/login.usecase';
import { LogoutUseCase } from '../application/logout.usecase';
import { UserPrismaRepository } from 'src/user/infrastructure/user.prisma.repository';
import { USER_REPOSITORY } from 'src/user/domain/user.repository';
import { PerfilModule } from 'src/perfil/infrastructure/perfil.module';

@Module({
  imports: [
    UsersModule,
    PerfilModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    RegisterUseCase,
    RefreshUseCase,
    LoginUseCase,
    LogoutUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [AuthController],
  exports: [
    RegisterUseCase,
    RefreshUseCase,
    LoginUseCase,
    LogoutUseCase
  ]
})
export class AuthModule { }
