import { Injectable } from '@nestjs/common';
import { AboutDto } from './dtos/about.dto';
import { ClientDto } from './dtos/client.dto';
import { ServiceDto } from './dtos/service.dto';
import { ActionDto } from './dtos/action.dto';
import { ReactionDto } from './dtos/reaction.dto';

@Injectable()
export class AboutService {
  clientIp: string;

  getAboutJson(): AboutDto {
    const current_time = Math.floor(Date.now() / 1000);
    const clientDto = new ClientDto();
    clientDto.host = this.clientIp;

    const aboutDto = new AboutDto();
    aboutDto.client = clientDto;
    aboutDto.server = {
      current_time: current_time,
      services: [],
    };

    return aboutDto;
  }

  setClientIp(clientIp: string): void {
    this.clientIp = clientIp;
  }
}
