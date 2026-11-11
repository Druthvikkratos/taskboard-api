import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { TaskListener } from './tasks.listener.js';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskListener]
})
export class TasksModule {}
