/*
  Warnings:

  - Added the required column `dat_atualizacao` to the `tb_usuario` table without a default value. This is not possible if the table is not empty.

*/
CREATE SEQUENCE "tb_usuario_cod_usuario_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- AlterTable
ALTER TABLE "tb_usuario" 
ALTER COLUMN "cod_usuario" SET DEFAULT nextval('seguranca.tb_usuario_cod_usuario_seq');

CREATE SEQUENCE "tb_perfil_cod_perfil_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- CreateTable
CREATE TABLE "tb_perfil" (
    "cod_perfil" BIGINT NOT NULL DEFAULT nextval('seguranca.tb_perfil_cod_perfil_seq'),
    "nom_perfil" VARCHAR NOT NULL,
    "dat_criacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_perfil_pk" PRIMARY KEY ("cod_perfil")
);

-- CreateTable
CREATE TABLE "tb_usuario_perfil" (
    "cod_usuario" BIGINT NOT NULL,
    "cod_perfil" BIGINT NOT NULL,

    CONSTRAINT "tb_usuario_perfil_pk" PRIMARY KEY ("cod_usuario","cod_perfil")
);

-- AddForeignKey
ALTER TABLE "tb_usuario_perfil" ADD CONSTRAINT "tb_usuario_perfil_cod_usuario_fkey" FOREIGN KEY ("cod_usuario") REFERENCES "tb_usuario"("cod_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_usuario_perfil" ADD CONSTRAINT "tb_usuario_perfil_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "tb_perfil"("cod_perfil") ON DELETE CASCADE ON UPDATE CASCADE;
