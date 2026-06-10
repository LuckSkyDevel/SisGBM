-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "seguranca";

-- CreateTable
CREATE TABLE "tb_usuario" (
    "cod_usuario" BIGINT NOT NULL,
    "nom_usuario" VARCHAR NOT NULL,
    "des_email" VARCHAR NOT NULL,
    "des_senha" VARCHAR NOT NULL,
    "dat_criacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dat_atualizacao" DATE NULL,
    "str_refresh_token" VARCHAR,

    CONSTRAINT "tb_usuario_pk" PRIMARY KEY ("cod_usuario")
);

