import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { PrismaModule } from '@app/prisma';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
  imports: [PrismaModule],
  exports: [TodosService],
})
export class TodosModule { }
