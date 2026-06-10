# 1. Escolha a imagem oficial do Node.js baseada no Alpine para uma imagem mais leve
FROM node:22.20.0-alpine AS development

# 2. Defina o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copie os arquivos de dependências
COPY package.json yarn.lock ./

# 4. Instale as dependências usando Yarn
RUN yarn install

# 5. Copie o restante dos arquivos do projeto
COPY . .

RUN yarn prisma generate

EXPOSE 3000

# 6. Faça o build da aplicação (gera a pasta dist)
CMD ["yarn", "start:dev"]


# Produção: Use uma imagem mais leve para rodar a aplicação
FROM node:22.20.0-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./

# Instale apenas as dependências de produção
RUN yarn install --production --frozen-lockfile

# Copie o código compilado da etapa de desenvolvimento
COPY --from=development /app/dist ./dist

# Exponha a porta padrão do NestJS (ou a porta que você configurou)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main"]