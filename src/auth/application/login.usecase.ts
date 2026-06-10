/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../infrastructure/auth.service';
import * as userRepository from 'src/user/domain/user.repository';

@Injectable()
export class LoginUseCase {

    constructor(
        @Inject(userRepository.USER_REPOSITORY)
        private readonly userRepo: userRepository.IUserRepository,
        private readonly authService: AuthService,
    ) { }

    async execute(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);

        if (!user)
            throw new UnauthorizedException('Credenciais inválidas');

        const isPasswordValid = await this.authService.comparePasswords(password, user.desSenha);

        if (!isPasswordValid)
            throw new UnauthorizedException('Credenciais inválidas');

        const tokens = await this.authService.generateTokens(user.codUsuario, user.desEmail, user.nomUsuario, user.perfis);
        await this.userRepo.updateRefreshToken(BigInt(user.codUsuario), tokens.refreshToken);

        return { user: user.toPublic(), ...tokens };
    }
}
