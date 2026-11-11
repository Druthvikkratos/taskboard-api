import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { type createTaskInput, createTaskSchema } from './tasks.schema.js';
import { z } from 'zod';
import { Roles } from '../common/roles.decorator.js';
import { RolesGuard } from '../common/roles.guard.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  create(@Body({ schema: createTaskSchema }) body: createTaskInput) {
    return this.taskService.create(body);
  }

  @Get(':id')
  findOne(
    @Param('id', { schema: z.coerce.number().int().positive() }) id: number,
  ) {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  remove(
    @Param('id', { schema: z.coerce.number().int().positive() }) id: number,
  ) {
    return this.taskService.remove(id);
  }
}
