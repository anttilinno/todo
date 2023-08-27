import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TodosRepository } from './todos.repository';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
  imports: [PrismaModule],
  exports: [TodosService],
})
export class TodosModule { }
