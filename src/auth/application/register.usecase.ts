/* eslint-disable prettier/prettier */
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as userRepository from 'src/user/domain/user.repository';
import { AuthService } from '../infrastructure/auth.service';
import { Perfil } from 'src/perfil/domain/perfil.enum';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(userRepository.USER_REPOSITORY)
    private readonly userRepo: userRepository.IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(nomeUsuario: string, email: string, senha: string) {
    const existing = await this.userRepo.findByEmail(email);

    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const passwordHash = await this.authService.hashPassword(senha);
    const newUser = await this.userRepo.create(nomeUsuario, email, passwordHash);

    const tokens = await this.authService.generateTokens(newUser.codUsuario, newUser.desEmail, newUser.nomUsuario, [Perfil.USER]);
    
    await this.userRepo.updateRefreshToken(BigInt(newUser.codUsuario), tokens.refreshToken);

    return { user: newUser.toPublic(), ...tokens };
  }
}
