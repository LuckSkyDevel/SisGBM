import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../infrastructure/auth.service';
import * as userRepository from 'src/user/domain/user.repository';

@Injectable()
export class RefreshUseCase {
  constructor(
    @Inject(userRepository.USER_REPOSITORY)
    private readonly userRepo: userRepository.IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(codUsuario: string) {
    const codigoUsuario = BigInt(codUsuario);

    const user = await this.userRepo.findById(codigoUsuario);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const tokens = await this.authService.generateTokens(
      user.codUsuario,
      user.desEmail,
      user.nomUsuario,
      user.perfis,
    );
    await this.userRepo.updateRefreshToken(
      BigInt(user.codUsuario),
      tokens.refreshToken,
    );

    return tokens;
  }
}
