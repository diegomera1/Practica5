import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      const name = client.handshake.query.name as string;
      await this.chatService.registerClient(client, name);
      this.wss.emit('clients-updated', this.chatService.getClients());
      console.log('Connected: ', client.id);
    } catch (error) {
      client.disconnect(true);
      return;
    }
  }

  handleDisconnect(client: Socket) {
    this.chatService.removeClient(client.id);
    this.wss.emit('clients-updated', this.chatService.getClients());
    console.log('Disconnected: ', client.id);
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: MessageDto) {
    this.wss.emit('message-from-server', {
      username: this.chatService.getClientName(client.id),
      message: payload.message ?? '',
    });
  }
}
