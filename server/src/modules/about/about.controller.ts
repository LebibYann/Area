import { Controller, Get, Req } from '@nestjs/common';
import { AboutService } from './about.service';
import { IpAddress } from 'src/common/decorators/ip-adress.decorator';

@Controller()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get('about.json')
  getAbout(@IpAddress() clientIp: string): any {
    this.aboutService.setClientIp(clientIp);
    return this.aboutService.getAboutJson();
  }
}
