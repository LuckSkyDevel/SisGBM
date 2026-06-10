import { Inject, Injectable } from '@nestjs/common';
import * as userRepository from 'src/user/domain/user.repository';
import { AuthService } from '../infrastructure/auth.service';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(userRepository.USER_REPOSITORY)
    private readonly userRepo: userRepository.IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(codUsuario: string) {
    const codigoUsuario = BigInt(codUsuario);
    await this.userRepo.updateRefreshToken(codigoUsuario, null);

    return { message: 'Logout realizado com sucesso' };
  }
}
