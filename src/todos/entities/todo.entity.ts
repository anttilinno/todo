import { Todo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class TodoEntity implements Todo {
    @ApiProperty()
    id: bigint;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, nullable: true })
    content: string | null;
}
