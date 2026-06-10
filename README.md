# SisGBM

Projeto NestJS com autenticação JWT completa: access token + refresh token, CRUD.

## Tecnologias
- **NestJS** — framework Node.js
- **@nestjs/jwt** + **passport-jwt** — autenticação JWT
- **bcryptjs** — hash de senhas
- **class-validator** — validação de DTOs
- **prisma** - ORM de acesso ao Banco de Dados PostgreSQL

## Instalação

```bash
yarn install
cp .env.example .env
# Edite o .env com seus segredos
```

## Rodando

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build
yarn start:prod
```

## Endpoints Livres

| Método | Rota                | Autenticação    | Descrição           |
|--------|---------------------|-----------------|---------------------|
| POST   | /api/auth/register  | —               | Cadastro de usuário |
| POST   | /api/auth/login     | —               | Login               |
| POST   | /api/auth/refresh   | Refresh Token   | Renovar tokens      |
| POST   | /api/auth/logout    | Bearer Token    | Logout              |

## Exemplos de uso

### Cadastro
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@email.com","password":"senha123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123"}'
```

### Rota protegida
```bash
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

### Renovar token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"SEU_REFRESH_TOKEN"}'
```

## Arquitetura Básica

```
src/
├── auth/
|   ├──application                        # Executa as Regras de Negócio - não sabe nada de HTTP e Banco
│   │   ├── dto/                          # Validação de entrada
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── refresh.dto.ts
│   │   ├── login.usecase.ts     
│   │   ├── logout.usecase.ts
│   │   ├── refresh.usecase.ts
│   │   ├── register.usecase.ts
│   ├── strategies/                      # Estratégias Passport
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
|   ├── infrastructure/ 
│   │   ├── auth.controller.ts           # Somente HTTP
│   │   ├── auth.module.ts               # Conecta interface ao implementação concreta
│   │   └── auth.service.ts              # Suporte para usecases
├── users/
|   ├── domain/
│   │   ├── user.entity.ts               # Regras de negócio pura - Sem framework, sem banco, sem http
│   │   ├── user.repository.ts           # Interface/Contrato - Define o que o repositório deve fazer, sem saber como.
|   ├── infrastructure/
│   │   ├── user.prisma.repository.ts    # Implementação da Interface/contrato - Onde realiza as requisições de banco
│   │   ├── users.controller.ts
│   │   └── users.module.ts
├── perfil/
...
├── common/
│   ├── decorators/
│   │   ├── perfil.decorator.ts           #Define Perfis como Roles no HTTP
│   │   └── current-user.decorator.ts
│   ├── guards/                           # Guards JWT
│   │   ├── perfis.guard.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt-refresh.guard.ts
├── app.module.ts
└── main.ts
```

## Boas práticas implementadas
- ✅ Access Token de curta duração (15 min)
- ✅ Refresh Token de longa duração (7 dias)
- ✅ Hash do Refresh Token no "banco"
- ✅ Invalidação do Refresh Token no logout
- ✅ Senhas com bcrypt (salt 12)
- ✅ Validação de entrada com class-validator
- ✅ Decorator `@CurrentUser()` reutilizável
- ✅ Variáveis de ambiente com @nestjs/config
- ✅ Clean Architecture

## Próximos passos sugeridos
- [ ] Adicionar Swagger (`@nestjs/swagger`)
- [ ] Adicionar rate limiting (`@nestjs/throttler`)
