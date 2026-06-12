/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UsersModule } from './user/infrastructure/users.module';
import { APP_GUARD } from '@nestjs/core';
import { PerfisGuard } from './common/guards/perfis.guards';
import { PerfilModule } from './perfil/infrastructure/perfil.module';
import { EscalaModule } from './scale/infrastructure/escala.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PerfilModule,
    EscalaModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PerfisGuard },
  ],
})
export class AppModule {}
