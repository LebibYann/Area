import { Controller, Get } from '@nestjs/common'
import { AboutService } from './about.service'
import { IpAddress } from 'src/common/decorators/ip-adress.decorator'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { AboutDto } from './about.dto'

/**
 * AboutController
 * Controller responsible for handling requests related to the about information.
 */
@Controller()
export class AboutController {
  constructor (private readonly aboutService: AboutService) {}

  /**
   * Get information about the application in JSON format.
   * @param clientIp - The client's IP address.
   * @returns About information in JSON format.
   */
  @Get('about.json')
  @ApiOperation({ summary: 'About' })
  @ApiOkResponse({ description: 'About JSON', type: AboutDto })
  getAbout (@IpAddress() clientIp: string): any {
    this.aboutService.setClientIp(clientIp)
    return this.aboutService.getAboutJson()
  }
}
