import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private repository: TodosRepository) { }

  async create(params: { title: Todo['title'], content?: Todo['content'] }) {
    const { title, content } = params;

    const todo = await this.repository.createTodo({
      data: {
        title,
        content
      },
    });

    return todo;
  }

  async findAll() {
    return await this.repository.getTodos({});
  }

  async findOne(id: number) {
    return await this.repository.getTodo({ id });
  }

  async update(id: number, params: { title?: Todo['title'], content?: Todo['content'] }) {
    return await this.repository.updateTodo({ where: { id }, data: params });
  }

  async remove(id: number) {
    return await this.repository.deleteTodo({ where: { id } });
  }
}
