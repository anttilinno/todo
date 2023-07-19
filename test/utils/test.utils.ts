import { Prisma, Todo } from "@prisma/client";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@app/prisma/prisma.service";

export class TestUtils {
    private prismaService: PrismaService;
    private app: INestApplication;

    constructor(app: INestApplication) {
        this.app = app;
        this.prismaService = app.get<PrismaService>(PrismaService);
    }

    async createTodo(
        todo: Prisma.TodoCreateInput,
    ): Promise<Todo> {
        return this.prismaService.todo.create({ data: todo });
    }
}