import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Clients } from './clients.interface';
import { PrestamoService } from '../prestamo/prestamo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from 'src/prestamo/prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  private clients: Clients = {};

  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
    private readonly prestamoService: PrestamoService,
  ) {}

  async registerClient(client: Socket, name: string) {
    console.log('Attempt to login: ', name);
    const prestamo = await this.prestamoService.findOneByName(name);
    if (!prestamo) throw new Error(`Prestamo ${name} not found`);
    if (this.findClientByName(name)) {
      console.error(`Prestamo ${name} already logged in`);
      throw new Error(`Prestamo ${name} already logged in`);
    }

    this.clients[client.id] = { socket: client, user: prestamo };
  }

  removeClient(clientId: string) {
    delete this.clients[clientId];
  }

  getClients() {
    return Object.values(this.clients).map((client) => client.user.name);
  }

  getClientName(clientId: string) {
    return this.clients[clientId].user.name;
  }

  private findClientByName(name: string) {
    return Object.values(this.clients).find(
      (client) => client.user.name === name,
    );
  }
}
