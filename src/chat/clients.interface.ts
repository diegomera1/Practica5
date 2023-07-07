import { Socket } from 'socket.io';
import { Prestamo } from '../prestamo/prestamo.entity';

export interface Clients {
  [id: string]: {
    socket: Socket;
    user: Prestamo;
  };
}
