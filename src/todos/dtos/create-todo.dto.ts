import { PickType } from '@nestjs/mapped-types';
import { TodoEntity } from '../entities/todo.entity';

export class CreateTodoDto extends PickType(TodoEntity, ['title', 'content']) { }