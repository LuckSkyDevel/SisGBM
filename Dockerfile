# 1. Escolha a imagem oficial do Node.js baseada no Alpine para uma imagem mais leve
FROM node:22.20.0-alpine AS development

# 2. Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

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


FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
COPY prisma ./prisma
COPY prisma.config.ts ./

# ARG para receber a variável no build
ARG DIRECT_URL
ENV DIRECT_URL=${DIRECT_URL}

RUN yarn prisma generate
RUN yarn build


# Produção: Use uma imagem mais leve para rodar a aplicação
FROM node:22-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.ts ./

EXPOSE 3000

CMD ["yarn", "start:prod"]