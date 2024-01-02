import { ApiProperty } from '@nestjs/swagger'

export class ClientDto {
  @ApiProperty({ example: '127.0.0.1', description: 'The IP address of the client' })
    host: string
}

export class AReaDto {
  @ApiProperty({ example: 'send/receive email', description: 'The name of the action' })
    name: string

  @ApiProperty({ example: 'Send an email/When a email is received', description: 'The description of the action' })
    description: string
  
    @ApiProperty({ example: 'mail: lol@gmail.com', description: 'First param of the request' })
    param1?: string

    @ApiProperty({ example: 'header: Wake up for the meeting at 9h30', description: 'Second param of the request' })
    param2?: string

    @ApiProperty({ example: 'body: Guys if you say 9h30, you have to wake up !', description: 'Third param of the request' })
    param3?: string
}

export class ServiceDto {
  @ApiProperty({ example: 'google', description: 'The name of the service' })
    name: string

  @ApiProperty({ example: 'src/assets/logo/googgle.png'})
    image: string

  @ApiProperty({ description: 'The actions of the service', type: [AReaDto] })
    actions: AReaDto[]

  @ApiProperty({ description: 'The reactions of the service', type: [AReaDto] })
    reactions: AReaDto[]
}

export class ServerDto {
  @ApiProperty({ example: '1702988412', description: 'The current time' })
    currentTime: number

  @ApiProperty({ description: 'The services', type: [ServiceDto] })
    services: ServiceDto[]
}

export class AboutDto {
  @ApiProperty({ description: 'The client' })
    client: ClientDto

  @ApiProperty({ description: 'The server' })
    server: ServerDto
}
