import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskInput } from './tasks.schema.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(private readonly events: EventEmitter2) {}
  private tasks: { id: number; title: string; priority: string }[] = [];
  private nextId: 1;

  create(data: createTaskInput) {
    const task = { id: this.nextId++, ...data };
    this.tasks.push(task);
    this.events.emit('task.created', task);
    return task;
  }

  findOne(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  remove(id: number) {
    this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return { deleted: true };
  }
}
