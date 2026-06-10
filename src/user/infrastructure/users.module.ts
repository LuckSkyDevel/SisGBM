import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USER_REPOSITORY } from '../domain/user.repository';
import { UserPrismaRepository } from './user.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
