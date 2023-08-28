import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
