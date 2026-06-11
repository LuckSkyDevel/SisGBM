/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'prisma/seeds/perfil.seed.ts',
  },
  datasource: {
    url: env['DIRECT_URL'],
  },
});
