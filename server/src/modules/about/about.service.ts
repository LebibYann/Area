import { Injectable } from '@nestjs/common'
import {
  type ClientDto,
  type AboutDto
} from './about.dto'
import { ServiceName, services } from './about.const'

@Injectable()
export class AboutService {
  clientIp: string

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

  setClientIp (clientIp: string): void {
    this.clientIp = clientIp
  }

  getServicesNames (): string[] {
    return Object.values(ServiceName)
  }
}
