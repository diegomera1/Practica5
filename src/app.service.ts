import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      ok: true,
      message: 'Server is running!',
    };
  }
}
