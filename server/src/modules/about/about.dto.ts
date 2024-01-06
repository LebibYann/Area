import { ApiProperty } from '@nestjs/swagger'

/**
 * ClientDto
 * Data transfer object for client information.
 */
export class ClientDto {
  /**
   * The IP address of the client.
   * @example
   * 127.0.0.1
   */
  @ApiProperty({ example: '127.0.0.1', description: 'The IP address of the client' })
    host: string
}

/**
 * AReaDto
 * Data transfer object for actions and reactions information.
 */
export class AReaDto {
  /**
   * The name of the action.
   * @example
   * send/receive email
   */
  @ApiProperty({ example: 'send/receive email', description: 'The name of the action' })
    name: string

  /**
   * The description of the action.
   * @example
   * Send an email/When an email is received
   */
  @ApiProperty({ example: 'Send an email/When a email is received', description: 'The description of the action' })
    description: string
  
    /**
   * First parameter of the request.
   * @example
   * mail: lol@gmail.com
   */
    @ApiProperty({ example: 'mail: lol@gmail.com', description: 'First param of the request' })
    param1?: string

    /**
   * Second parameter of the request.
   * @example
   * header: Wake up for the meeting at 9h30
   */
    @ApiProperty({ example: 'header: Wake up for the meeting at 9h30', description: 'Second param of the request' })
    param2?: string

    /**
   * Third parameter of the request.
   * @example
   * body: Guys if you say 9h30, you have to wake up!
   */
    @ApiProperty({ example: 'body: Guys if you say 9h30, you have to wake up !', description: 'Third param of the request' })
    param3?: string
}

/**
 * ServiceDto
 * Data transfer object for service information.
 */
export class ServiceDto {
  /**
   * The name of the service.
   * @example
   * google
   */
  @ApiProperty({ example: 'google', description: 'The name of the service' })
    name: string

  /**
   * The image of the service.
   * @example
   * src/assets/logo/googgle.png
   */
  @ApiProperty({ example: 'src/assets/logo/googgle.png'})
    image: string

  /**
   * The actions of the service.
   * @example
   * [AReaDto]
   */
  @ApiProperty({ description: 'The actions of the service', type: [AReaDto] })
    actions: AReaDto[]

  /**
   * The reactions of the service.
   * @example
   * [AReaDto]
   */
  @ApiProperty({ description: 'The reactions of the service', type: [AReaDto] })
    reactions: AReaDto[]
}

/**
 * ServerDto
 * Data transfer object for server information.
 */
export class ServerDto {
  /**
   * The current time.
   * @example
   * 1702988412
   */
  @ApiProperty({ example: '1702988412', description: 'The current time' })
    currentTime: number

  /**
   * The services.
   * @example
   * [ServiceDto]
   */
  @ApiProperty({ description: 'The services', type: [ServiceDto] })
    services: ServiceDto[]
}

/**
 * AboutDto
 * Data transfer object for about information.
 */
export class AboutDto {
  /**
   * The client information.
   * @example
   * ClientDto
   */
  @ApiProperty({ description: 'The client' })
    client: ClientDto

  /**
   * The server information.
   * @example
   * ServerDto
   */
  @ApiProperty({ description: 'The server' })
    server: ServerDto
}
