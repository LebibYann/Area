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

    const searcAction = new ActionDto();
    searcAction.name = 'search';
    searcAction.description = 'Search for something on Google';

    const googleService = new ServiceDto();
    googleService.name = 'google';
    googleService.actions = [
      searcAction,
    ];
    googleService.reactions = [
      {
        name: 'send_email',
        description: 'Send an email to someone',
      },
    ];

    const aboutDto = new AboutDto();
    aboutDto.client = clientDto;
    aboutDto.server = {
      current_time: current_time,
      services: [
        googleService,
      ],
    };

    return aboutDto;
  }

  setClientIp(clientIp: string): void {
    this.clientIp = clientIp;
  }
}
