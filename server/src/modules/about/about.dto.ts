import { ApiProperty } from "@nestjs/swagger";

export class ClientDto {
    @ApiProperty({ example: '127.0.0.1', description: 'The IP address of the client' })
    host: string;
}

export class AReaDto {
    @ApiProperty({ example: 'send/receive email', description: 'The name of the action' })
    name: string;

    @ApiProperty({ example: 'Send an email/When a email is received', description: 'The description of the action' })
    description: string;
}

export class ServiceDto {
    @ApiProperty({ example: 'google', description: 'The name of the service' })
    name: string;

    @ApiProperty({ description: 'The actions of the service', type: [AReaDto] })
    actions: AReaDto[];

    @ApiProperty({ description: 'The reactions of the service', type: [AReaDto] })
    reactions: AReaDto[];
}

export class ServerDto {
    @ApiProperty({ example: '1702988412', description: 'The current time' })
    current_time: number;

    @ApiProperty({ description: 'The services', type: [ServiceDto] })
    services: ServiceDto[];
}

export class AboutDto {
    @ApiProperty({  description: 'The client' })
    client: ClientDto;

    @ApiProperty({  description: 'The server' })
    server: ServerDto;
}
