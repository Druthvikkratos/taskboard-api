import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TaskListener {
  private readonly logger = new Logger(TaskListener.name);

  @OnEvent('task.created')
  handleTaskCreated(task: { id: number; title: string; priority: string }) {
    this.logger.log(`New task #${task.id}: ${task.title} (${task.priority})`);
  }
}
