import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskInput } from './tasks.schema.js';

@Injectable()
export class TasksService {
  private tasks: { id: number; title: string; priority: string }[] = [];
  private nextId: 1;

  create(data: createTaskInput) {
    const task = { id: this.nextId++, ...data };
    this.tasks.push(task);
    return task;
  }

  findOne(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
