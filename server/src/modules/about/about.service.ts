import { Injectable } from '@nestjs/common'
import {
  type ClientDto,
  type AboutDto
} from './about.dto'
import { services } from './about.const'


/**
 * AboutService
 * Service responsible for providing information about the application.
 */
@Injectable()
export class AboutService {
  clientIp: string

  /**
   * Get about information in JSON format.
   * @returns About information in JSON format.
   */
  getAboutJson (): AboutDto {
    const currentTime = Math.floor(Date.now() / 1000)

    const client: ClientDto = {
      host: this.clientIp
    }

    const aboutDto: AboutDto = {
      client,
      server: {
        currentTime,
        services
      }
    }

    return aboutDto
  }

  /**
   * Set the client's IP address.
   * @param clientIp - The client's IP address.
   */
  setClientIp (clientIp: string): void {
    this.clientIp = clientIp
  }
}
