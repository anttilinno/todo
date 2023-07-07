import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';

import { PrismaService } from 'src/prisma/prisma.service';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [TodosController],
  //     providers: [],
  //   }).compile();

  //   controller = module.get<TodosController>(TodosController);
  // });

  beforeEach(() => {
    service = new TodosService();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
