import { Injectable, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksCorn {
  private readonly logger = new Logger(TasksCorn.name);

  constructor(private readonly tasksService: TasksService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  reportTaskCount() {
    this.logger.log(`Total tasks right now: ${this.tasksService.count()}`);
  }
}
