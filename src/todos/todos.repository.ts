import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosRepository {
    constructor(private prisma: PrismaService) { }

    async createTodo(params: { data: Prisma.TodoCreateInput }): Promise<Todo> {
        const { data } = params;

        return this.prisma.todo.create({ data });
    }

    async getTodo(params: { id: number }): Promise<Todo> {
        return this.prisma.todo.findUniqueOrThrow({
            where: params
        });
    }

    async getTodos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TodoWhereUniqueInput;
        where?: Prisma.TodoWhereInput;
        orderBy?: Prisma.TodoOrderByWithRelationInput;
    }): Promise<Todo[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.todo.findMany({ skip, take, cursor, where, orderBy });
    }

    async updateTodo(params: {
        where: Prisma.TodoWhereUniqueInput;
        data: Prisma.TodoUpdateInput;
    }): Promise<Todo> {
        const { where, data } = params;

        return this.prisma.todo.update({ where, data });
    }

    async deleteTodo(params: {
        where: Prisma.TodoWhereUniqueInput;
    }): Promise<Todo> {
        const { where } = params;

        return this.prisma.todo.delete({ where });
    }
}