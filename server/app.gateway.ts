/** @format */

// #region Imports NPM
import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
// #endregion

@WebSocketGateway(4001, { transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: any;

  private logger = new Logger('AppGateway');

  handleConnection(client: any): void {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: any): void {
    this.logger.log('Client disconnected');
  }
}
