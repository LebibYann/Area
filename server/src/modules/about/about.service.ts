import { Injectable } from '@nestjs/common';
import {
  ClientDto,
  AboutDto,
} from './about.dto';
import { services } from './about.const';

@Injectable()
export class AboutService {
  clientIp: string;

  getAboutJson(): AboutDto {
    const current_time = Math.floor(Date.now() / 1000);

    const client: ClientDto = {
      host: this.clientIp,
    };

    const aboutDto: AboutDto = {
      client: client,
      server: {
        current_time,
        services: services,
      },
    };

    return aboutDto;
  }

  setClientIp(clientIp: string): void {
    this.clientIp = clientIp;
  }
}
