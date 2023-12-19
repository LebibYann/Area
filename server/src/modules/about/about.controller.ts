import { Controller, Get, Req } from '@nestjs/common';
import { AboutService } from './about.service';
import { IpAddress } from 'src/common/decorators/ip-adress.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AboutDto } from './about.dto';


@Controller()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get('about.json')
  @ApiOperation({ summary: 'About' })
  @ApiOkResponse({ description: 'About JSON', type: AboutDto })
  getAbout(@IpAddress() clientIp: string): any {
    this.aboutService.setClientIp(clientIp);
    return this.aboutService.getAboutJson();
  }
}
