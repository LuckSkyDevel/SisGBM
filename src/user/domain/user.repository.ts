import { UserEntity } from './user.entity';

export interface IUserRepository {
  create(
    nomeUsuario: string,
    email: string,
    senha: string,
  ): Promise<Omit<UserEntity, 'desSenha' | 'refreshToken'>>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findById(codUser: bigint): Promise<UserEntity | null>;

  // eslint-disable-next-line prettier/prettier
  updateRefreshToken(codUser: bigint, refreshToken: string | null): Promise<void>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');
