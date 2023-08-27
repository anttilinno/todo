import { Prisma, Todo } from "@prisma/client";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "@todo/prisma/prisma.service";

interface WithId {
    id: BigInt | number;
}

export class TestUtils {
    private prismaService: PrismaService;
    private app: INestApplication;

    constructor(app: INestApplication) {
        this.app = app;
        this.prismaService = app.get<PrismaService>(PrismaService);
    }

    formatObject<T extends WithId>(testObject: T): T {
        return { ...testObject, id: Number(testObject.id) }
    }

    async createTodo(
        todo: Prisma.TodoCreateInput,
    ): Promise<Todo> {
        const createdTodo = await this.prismaService.todo.create({ data: todo });

        return this.formatObject(createdTodo);
    }
}