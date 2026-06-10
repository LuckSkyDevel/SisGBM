# NestJS JWT Auth

Projeto NestJS com autenticação JWT completa: access token + refresh token.

## Tecnologias
- **NestJS** — framework Node.js
- **@nestjs/jwt** + **passport-jwt** — autenticação JWT
- **bcryptjs** — hash de senhas
- **class-validator** — validação de DTOs

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

## Endpoints

| Método | Rota                | Autenticação    | Descrição           |
|--------|---------------------|-----------------|---------------------|
| POST   | /api/auth/register  | —               | Cadastro de usuário |
| POST   | /api/auth/login     | —               | Login               |
| POST   | /api/auth/refresh   | Refresh Token   | Renovar tokens      |
| POST   | /api/auth/logout    | Bearer Token    | Logout              |
| GET    | /api/users/profile  | Bearer Token    | Perfil do usuário   |

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

## Arquitetura

```
src/
├── auth/
│   ├── dto/                  # Validação de entrada
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   └── refresh.dto.ts
│   ├── guards/               # Guards JWT
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt-refresh.guard.ts
│   ├── strategies/           # Estratégias Passport
│   │   ├── jwt.strategy.ts
│   │   └── jwt-refresh.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts      # Simulação de DB em memória
├── common/
│   └── decorators/
│       └── current-user.decorator.ts
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

## Próximos passos sugeridos
- [ ] Substituir o DB em memória por TypeORM + PostgreSQL
- [ ] Adicionar Swagger (`@nestjs/swagger`)
- [ ] Implementar roles/permissões com `@Roles()` decorator
- [ ] Adicionar rate limiting (`@nestjs/throttler`)
