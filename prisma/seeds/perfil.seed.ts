import { PrismaClient } from '@prisma/client';
import { Perfil } from '../../src/perfil/domain/perfil.enum';

const prisma = new PrismaClient();

async function main() {
  for (const perfil of Object.values(Perfil)) {
    await prisma.perfil.upsert({
      where: { nomPerfil: perfil },
      update: {},
      create: { nomPerfil: perfil },
    });
  }
  console.log('Perfis criados:', Object.values(Perfil));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
