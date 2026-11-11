import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(TasksGateway.name);

  @WebSocketServer() server!: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket, reason?: string) {
    this.logger.log(`Client disconnected: ${client.id}, reason: ${reason}`);
  }

  @OnEvent('task.created')
  broadCastTask(task: { id: number; title: string; priority: string }) {
    this.server.emit('taskCreated', task);
  }
}
