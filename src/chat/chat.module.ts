import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrestamoModule } from '../prestamo/prestamo.module';
// import { PrestamoController } from 'src/prestamo/prestamo.controller';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [PrestamoModule],
})
export class ChatModule {}
