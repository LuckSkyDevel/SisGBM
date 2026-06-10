/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string, email: string, name: string, perfis: string[]) {
    const payload = { sub: userId, email, name, perfis };
    const jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
    const jwtExpires = this.configService.getOrThrow<string>('JWT_EXPIRES_IN') as StringValue;
    const refreshSecret = this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
    const refreshExpires = this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN') as StringValue;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { secret: jwtSecret, expiresIn: jwtExpires }),
      this.jwtService.signAsync(payload, { secret: refreshSecret, expiresIn: refreshExpires }),
    ]);

    return { accessToken, refreshToken };
  }

  // Valida o refresh token comparando com o hash salvo no banco
  async validateRefreshToken(
    refreshToken: string,
    hashedToken: string,
  ): Promise<void> {
    const isValid = await bcrypt.compare(refreshToken, hashedToken);
    
    if (!isValid) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }

  // Decodifica o refresh token e retorna o payload
  async decodeRefreshToken(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
